param(
  [int]$Port = $(if ($env:PORT) { [int]$env:PORT } else { 8080 })
)

$ErrorActionPreference = "Stop"

$script:ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$script:PublicRoot = Join-Path $script:ProjectRoot "public"
$script:DataFile = Join-Path $script:ProjectRoot "data\gadgets.json"
$script:PublicRootFull = [System.IO.Path]::GetFullPath($script:PublicRoot)
$script:ApiVersion = "1.0.0"
$script:StartedAt = Get-Date
$script:RateWindowSeconds = 60
$script:RateLimitMax = 120
$script:RateState = @{}
$script:Gadgets = @()

if (-not (Test-Path -LiteralPath $script:DataFile)) {
  throw "Missing dataset at $script:DataFile"
}

$script:Gadgets = Get-Content -LiteralPath $script:DataFile -Raw | ConvertFrom-Json

function Write-Log {
  param([string]$Message)
  Write-Host ("[{0}] {1}" -f (Get-Date -Format "u"), $Message)
}

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { return "text/html; charset=utf-8" }
    ".css" { return "text/css; charset=utf-8" }
    ".js" { return "application/javascript; charset=utf-8" }
    ".json" { return "application/json; charset=utf-8" }
    ".svg" { return "image/svg+xml" }
    ".txt" { return "text/plain; charset=utf-8" }
    ".xml" { return "application/xml; charset=utf-8" }
    ".ico" { return "image/x-icon" }
    default { return "application/octet-stream" }
  }
}

function Get-ReasonPhrase {
  param([int]$StatusCode)

  switch ($StatusCode) {
    200 { return "OK" }
    204 { return "No Content" }
    400 { return "Bad Request" }
    404 { return "Not Found" }
    405 { return "Method Not Allowed" }
    429 { return "Too Many Requests" }
    500 { return "Internal Server Error" }
    default { return "OK" }
  }
}

function Get-QueryMap {
  param([string]$Query)

  $params = @{}
  if ([string]::IsNullOrWhiteSpace($Query)) {
    return $params
  }

  $trimmed = $Query.TrimStart("?")
  if ([string]::IsNullOrWhiteSpace($trimmed)) {
    return $params
  }

  foreach ($pair in $trimmed.Split("&")) {
    if ([string]::IsNullOrWhiteSpace($pair)) {
      continue
    }

    $parts = $pair.Split("=", 2)
    $key = [System.Uri]::UnescapeDataString($parts[0])
    if ([string]::IsNullOrWhiteSpace($key)) {
      continue
    }

    $value = ""
    if ($parts.Length -gt 1) {
      $value = [System.Uri]::UnescapeDataString($parts[1].Replace("+", " "))
    }

    $params[$key] = $value
  }

  return $params
}

function Get-CommonHeaders {
  param([string]$CacheControl = "no-store")

  return @{
    "X-Content-Type-Options" = "nosniff"
    "X-Frame-Options" = "DENY"
    "Referrer-Policy" = "no-referrer"
    "Permissions-Policy" = "camera=(), microphone=(), geolocation=()"
    "Cross-Origin-Resource-Policy" = "cross-origin"
    "Cross-Origin-Opener-Policy" = "same-origin"
    "Content-Security-Policy" = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
    "Cache-Control" = $CacheControl
    "Access-Control-Allow-Origin" = "*"
    "Access-Control-Allow-Methods" = "GET, HEAD, OPTIONS"
    "Access-Control-Allow-Headers" = "Content-Type, Accept"
    "Vary" = "Origin"
  }
}

function New-TextResponse {
  param(
    [int]$StatusCode,
    [string]$Text,
    [string]$ContentType = "text/plain; charset=utf-8",
    [string]$CacheControl = "no-store",
    [hashtable]$Headers = @{}
  )

  return [ordered]@{
    StatusCode = $StatusCode
    ContentType = $ContentType
    CacheControl = $CacheControl
    Headers = $Headers
    BodyBytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
  }
}

function New-JsonResponse {
  param(
    [int]$StatusCode,
    $Payload
  )

  $json = $Payload | ConvertTo-Json -Depth 10
  return New-TextResponse -StatusCode $StatusCode -Text $json -ContentType "application/json; charset=utf-8" -CacheControl "no-store"
}

function New-FileResponse {
  param([string]$FilePath)

  $cacheControl = if ([System.IO.Path]::GetExtension($FilePath).ToLowerInvariant() -eq ".html") {
    "no-store"
  } else {
    "public, max-age=3600"
  }

  return [ordered]@{
    StatusCode = 200
    ContentType = (Get-ContentType -Path $FilePath)
    CacheControl = $cacheControl
    Headers = @{}
    BodyBytes = [System.IO.File]::ReadAllBytes($FilePath)
  }
}

function Send-Response {
  param(
    [System.Net.Sockets.TcpClient]$Client,
    [hashtable]$Request,
    [hashtable]$Response
  )

  $stream = $Client.GetStream()
  $statusCode = [int]$Response.StatusCode
  $bodyBytes = [byte[]]$Response.BodyBytes
  $contentLength = if ($null -eq $bodyBytes) { 0 } else { $bodyBytes.Length }

  $headerMap = Get-CommonHeaders -CacheControl $Response.CacheControl
  foreach ($entry in $Response.Headers.GetEnumerator()) {
    $headerMap[$entry.Key] = $entry.Value
  }

  $headerMap["Content-Type"] = $Response.ContentType
  $headerMap["Content-Length"] = [string]$contentLength
  $headerMap["Connection"] = "close"

  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add(("HTTP/1.1 {0} {1}" -f $statusCode, (Get-ReasonPhrase -StatusCode $statusCode)))

  foreach ($entry in $headerMap.GetEnumerator()) {
    $lines.Add(("{0}: {1}" -f $entry.Key, $entry.Value))
  }

  $headerText = ($lines -join "`r`n") + "`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerText)

  $stream.Write($headerBytes, 0, $headerBytes.Length)

  if ($Request.Method -ne "HEAD" -and $statusCode -ne 204 -and $contentLength -gt 0) {
    $stream.Write($bodyBytes, 0, $contentLength)
  }

  $stream.Flush()
}

function Read-Request {
  param([System.Net.Sockets.TcpClient]$Client)

  $stream = $Client.GetStream()
  $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 8192, $true)
  $requestLine = $reader.ReadLine()

  if ([string]::IsNullOrWhiteSpace($requestLine)) {
    return $null
  }

  $parts = $requestLine.Split(" ")
  if ($parts.Length -lt 2) {
    return $null
  }

  $headers = @{}
  while ($true) {
    $line = $reader.ReadLine()
    if ($null -eq $line -or $line -eq "") {
      break
    }

    $separatorIndex = $line.IndexOf(":")
    if ($separatorIndex -gt 0) {
      $name = $line.Substring(0, $separatorIndex).Trim()
      $value = $line.Substring($separatorIndex + 1).Trim()
      $headers[$name] = $value
    }
  }

  $targetParts = $parts[1].Split("?", 2)
  $path = if ($targetParts[0]) {
    [System.Uri]::UnescapeDataString($targetParts[0])
  } else {
    "/"
  }

  $query = if ($targetParts.Length -gt 1) {
    "?" + $targetParts[1]
  } else {
    ""
  }

  $remoteIp = "unknown"
  if ($Client.Client.RemoteEndPoint) {
    $remoteIp = ([System.Net.IPEndPoint]$Client.Client.RemoteEndPoint).Address.ToString()
  }

  return @{
    Method = $parts[0].ToUpperInvariant()
    Path = $path
    Query = $query
    Version = if ($parts.Length -gt 2) { $parts[2] } else { "HTTP/1.1" }
    Headers = $headers
    Host = if ($headers.ContainsKey("Host")) { $headers["Host"] } else { "localhost:$Port" }
    RemoteIp = $remoteIp
  }
}

function Test-RateLimit {
  param([string]$IpAddress)

  $now = Get-Date
  if (-not $script:RateState.ContainsKey($IpAddress)) {
    $script:RateState[$IpAddress] = New-Object System.Collections.ArrayList
  }

  $bucket = [System.Collections.ArrayList]$script:RateState[$IpAddress]
  for ($index = $bucket.Count - 1; $index -ge 0; $index--) {
    if ((($now - [datetime]$bucket[$index]).TotalSeconds) -ge $script:RateWindowSeconds) {
      $bucket.RemoveAt($index)
    }
  }

  if ($bucket.Count -ge $script:RateLimitMax) {
    return $false
  }

  [void]$bucket.Add($now)
  return $true
}

function Get-NormalizedText {
  param($Value)

  if ($null -eq $Value) {
    return ""
  }

  return $Value.ToString().Trim().ToLowerInvariant()
}

function Get-IntValue {
  param(
    [object]$Value,
    [int]$Fallback,
    [int]$Minimum = 1,
    [int]$Maximum = 1000
  )

  $parsed = 0
  if ([int]::TryParse([string]$Value, [ref]$parsed)) {
    if ($parsed -lt $Minimum) {
      return $Minimum
    }

    if ($parsed -gt $Maximum) {
      return $Maximum
    }

    return $parsed
  }

  return $Fallback
}

function Get-DoubleValue {
  param([object]$Value)

  $parsed = 0.0
  if ([double]::TryParse(
      [string]$Value,
      [System.Globalization.NumberStyles]::Float,
      [System.Globalization.CultureInfo]::InvariantCulture,
      [ref]$parsed
    )) {
    return $parsed
  }

  return $null
}

function Get-FilteredGadgets {
  param([hashtable]$QueryMap)

  $items = @($script:Gadgets)
  $filters = [ordered]@{}

  if ($QueryMap.ContainsKey("category") -and $QueryMap["category"]) {
    $category = Get-NormalizedText -Value $QueryMap["category"]
    $items = @($items | Where-Object { (Get-NormalizedText -Value $_.category) -eq $category })
    $filters["category"] = $QueryMap["category"]
  }

  if ($QueryMap.ContainsKey("brand") -and $QueryMap["brand"]) {
    $brand = Get-NormalizedText -Value $QueryMap["brand"]
    $items = @($items | Where-Object { (Get-NormalizedText -Value $_.brand) -eq $brand })
    $filters["brand"] = $QueryMap["brand"]
  }

  $minPrice = if ($QueryMap.ContainsKey("minPrice")) { Get-DoubleValue -Value $QueryMap["minPrice"] } else { $null }
  if ($null -ne $minPrice) {
    $items = @($items | Where-Object { [double]$_.priceUsd -ge $minPrice })
    $filters["minPrice"] = $minPrice
  }

  $maxPrice = if ($QueryMap.ContainsKey("maxPrice")) { Get-DoubleValue -Value $QueryMap["maxPrice"] } else { $null }
  if ($null -ne $maxPrice) {
    $items = @($items | Where-Object { [double]$_.priceUsd -le $maxPrice })
    $filters["maxPrice"] = $maxPrice
  }

  $sort = if ($QueryMap.ContainsKey("sort") -and $QueryMap["sort"]) {
    $QueryMap["sort"].ToString().ToLowerInvariant()
  } else {
    "name_asc"
  }

  switch ($sort) {
    "price_desc" { $items = @($items | Sort-Object priceUsd -Descending) }
    "price_asc" { $items = @($items | Sort-Object priceUsd) }
    "rating_desc" { $items = @($items | Sort-Object rating -Descending) }
    "year_desc" { $items = @($items | Sort-Object releaseYear -Descending) }
    default {
      $sort = "name_asc"
      $items = @($items | Sort-Object name)
    }
  }

  $limit = if ($QueryMap.ContainsKey("limit")) {
    Get-IntValue -Value $QueryMap["limit"] -Fallback 12 -Minimum 1 -Maximum 50
  } else {
    12
  }

  $page = if ($QueryMap.ContainsKey("page")) {
    Get-IntValue -Value $QueryMap["page"] -Fallback 1 -Minimum 1 -Maximum 500
  } else {
    1
  }

  $total = @($items).Count
  $skip = ($page - 1) * $limit
  $pagedItems = if ($skip -ge $total) {
    @()
  } else {
    @($items | Select-Object -Skip $skip -First $limit)
  }

  return [ordered]@{
    meta = [ordered]@{
      page = $page
      limit = $limit
      total = $total
      totalPages = [Math]::Max(1, [Math]::Ceiling($total / [double]$limit))
      filters = $filters
      sort = $sort
    }
    data = $pagedItems
  }
}

function Get-SearchResults {
  param([string]$Needle)

  $term = Get-NormalizedText -Value $Needle
  if ([string]::IsNullOrWhiteSpace($term)) {
    return @()
  }

  return @(
    $script:Gadgets | Where-Object {
      $haystack = @(
        $_.name,
        $_.brand,
        $_.category,
        $_.summary,
        ($_.tags -join " ")
      ) -join " "

      (Get-NormalizedText -Value $haystack).Contains($term)
    }
  )
}

function Get-CountsByProperty {
  param([string]$PropertyName)

  $rows = @()
  foreach ($group in @($script:Gadgets | Group-Object -Property $PropertyName | Sort-Object Name)) {
    $rows += [ordered]@{
      name = $group.Name
      count = $group.Count
    }
  }

  return $rows
}

function Resolve-StaticFile {
  param([string]$UrlPath)

  $path = if ([string]::IsNullOrWhiteSpace($UrlPath) -or $UrlPath -eq "/") {
    "/index.html"
  } else {
    $UrlPath
  }

  if ($path -in @("/docs", "/playground", "/examples")) {
    $path = "/index.html"
  }

  $relativePath = $path.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
  $candidate = Join-Path $script:PublicRoot $relativePath
  $fullPath = [System.IO.Path]::GetFullPath($candidate)

  if (-not $fullPath.StartsWith($script:PublicRootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  if ((Test-Path -LiteralPath $fullPath) -and (Get-Item -LiteralPath $fullPath).PSIsContainer) {
    $fullPath = Join-Path $fullPath "index.html"
  }

  if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
    return $fullPath
  }

  return $null
}

function Get-SitemapXml {
  param([string]$Host)

  $origin = "http://$Host"
  $paths = @(
    "/",
    "/api/v1/health",
    "/api/v1/gadgets",
    "/api/v1/categories",
    "/api/v1/brands",
    "/api/v1/featured",
    "/api/v1/random"
  )

  $lines = @(
    "<?xml version=""1.0"" encoding=""UTF-8""?>",
    "<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">"
  )

  foreach ($path in $paths) {
    $lines += "  <url><loc>$origin$path</loc></url>"
  }

  $lines += "</urlset>"
  return ($lines -join [Environment]::NewLine)
}

function Handle-ApiRequest {
  param(
    [string]$Path,
    [hashtable]$QueryMap
  )

  switch -Regex ($Path) {
    "^/api/v1/health/?$" {
      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        status = "ok"
        version = $script:ApiVersion
        uptimeSeconds = [Math]::Round(((Get-Date) - $script:StartedAt).TotalSeconds, 0)
        timestamp = (Get-Date).ToUniversalTime().ToString("o")
        dataset = [ordered]@{
          gadgets = @($script:Gadgets).Count
          categories = @((Get-CountsByProperty -PropertyName "category")).Count
          brands = @((Get-CountsByProperty -PropertyName "brand")).Count
        }
      })
    }

    "^/api/v1/gadgets/?$" {
      return New-JsonResponse -StatusCode 200 -Payload (Get-FilteredGadgets -QueryMap $QueryMap)
    }

    "^/api/v1/filter/?$" {
      return New-JsonResponse -StatusCode 200 -Payload (Get-FilteredGadgets -QueryMap $QueryMap)
    }

    "^/api/v1/gadgets/slug/([^/]+)/?$" {
      $slug = $Matches[1]
      $item = @($script:Gadgets | Where-Object { $_.slug -eq $slug } | Select-Object -First 1)
      if ($item.Count -eq 0) {
        return New-JsonResponse -StatusCode 404 -Payload ([ordered]@{
          error = "not_found"
          message = "No gadget found for slug '$slug'."
        })
      }

      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{ data = $item[0] })
    }

    "^/api/v1/gadgets/(\d+)/?$" {
      $id = [int]$Matches[1]
      $item = @($script:Gadgets | Where-Object { [int]$_.id -eq $id } | Select-Object -First 1)
      if ($item.Count -eq 0) {
        return New-JsonResponse -StatusCode 404 -Payload ([ordered]@{
          error = "not_found"
          message = "No gadget found for id '$id'."
        })
      }

      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{ data = $item[0] })
    }

    "^/api/v1/search/?$" {
      $needle = if ($QueryMap.ContainsKey("name")) { $QueryMap["name"] } else { "" }
      if ([string]::IsNullOrWhiteSpace($needle)) {
        return New-JsonResponse -StatusCode 400 -Payload ([ordered]@{
          error = "missing_query"
          message = "Use ?name= to search gadgets."
        })
      }

      $results = Get-SearchResults -Needle $needle
      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        meta = [ordered]@{
          query = $needle
          total = @($results).Count
        }
        data = $results
      })
    }

    "^/api/v1/categories/?$" {
      $rows = Get-CountsByProperty -PropertyName "category"
      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        total = @($rows).Count
        data = $rows
      })
    }

    "^/api/v1/brands/?$" {
      $rows = Get-CountsByProperty -PropertyName "brand"
      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        total = @($rows).Count
        data = $rows
      })
    }

    "^/api/v1/featured/?$" {
      $featured = @(
        $script:Gadgets |
          Sort-Object `
            @{ Expression = "rating"; Descending = $true }, `
            @{ Expression = "releaseYear"; Descending = $true } |
          Select-Object -First 6
      )

      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        total = @($featured).Count
        data = $featured
      })
    }

    "^/api/v1/random/?$" {
      return New-JsonResponse -StatusCode 200 -Payload ([ordered]@{
        data = (Get-Random -InputObject $script:Gadgets)
      })
    }

    default {
      return New-JsonResponse -StatusCode 404 -Payload ([ordered]@{
        error = "not_found"
        message = "This API route does not exist."
      })
    }
  }
}

function Handle-Request {
  param([hashtable]$Request)

  $method = $Request.Method
  $path = $Request.Path

  Write-Log -Message ("{0} {1} from {2}" -f $method, $path, $Request.RemoteIp)

  if ($method -notin @("GET", "HEAD", "OPTIONS")) {
    if ($path.StartsWith("/api/")) {
      return New-JsonResponse -StatusCode 405 -Payload ([ordered]@{
        error = "method_not_allowed"
        message = "Only GET, HEAD, and OPTIONS are supported."
      })
    }

    return New-TextResponse -StatusCode 405 -Text "Method not allowed."
  }

  if ($method -eq "OPTIONS") {
    return New-TextResponse -StatusCode 204 -Text ""
  }

  if (-not (Test-RateLimit -IpAddress $Request.RemoteIp)) {
    return New-JsonResponse -StatusCode 429 -Payload ([ordered]@{
      error = "rate_limit_exceeded"
      message = "Too many requests. Please retry in about a minute."
      retryAfterSeconds = $script:RateWindowSeconds
    })
  }

  if ($path -eq "/favicon.ico") {
    return New-FileResponse -FilePath (Join-Path $script:PublicRoot "assets\mockforge-mark.svg")
  }

  if ($path -eq "/sitemap.xml") {
    return New-TextResponse -StatusCode 200 -Text (Get-SitemapXml -Host $Request.Host) -ContentType "application/xml; charset=utf-8" -CacheControl "public, max-age=600"
  }

  $queryMap = Get-QueryMap -Query $Request.Query

  if ($path.StartsWith("/api/")) {
    return Handle-ApiRequest -Path $path -QueryMap $queryMap
  }

  $filePath = Resolve-StaticFile -UrlPath $path
  if ($null -ne $filePath) {
    return New-FileResponse -FilePath $filePath
  }

  return New-TextResponse -StatusCode 404 -Text "Not found."
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)

try {
  $listener.Start()
  Write-Log -Message "MockForge API is running at http://localhost:$Port/"
  Write-Log -Message "Press Ctrl+C to stop the server."

  while ($true) {
    $client = $listener.AcceptTcpClient()

    try {
      $request = Read-Request -Client $client
      if ($null -eq $request) {
        $client.Close()
        continue
      }

      $response = Handle-Request -Request $request
      Send-Response -Client $client -Request $request -Response $response
    } catch {
      Write-Log -Message ("Unhandled request error: " + $_.Exception.Message)

      try {
        if ($null -ne $request) {
          $fallback = New-JsonResponse -StatusCode 500 -Payload ([ordered]@{
            error = "internal_server_error"
            message = "The server could not process this request."
          })
          Send-Response -Client $client -Request $request -Response $fallback
        }
      } catch {
        Write-Log -Message "Failed to send 500 response."
      }
    } finally {
      $client.Close()
      $request = $null
    }
  }
} finally {
  $listener.Stop()
}
