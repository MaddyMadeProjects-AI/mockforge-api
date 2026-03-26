FROM mcr.microsoft.com/powershell:7.4-ubuntu-22.04

WORKDIR /app

COPY . /app

ENV PORT=8080

EXPOSE 8080

CMD ["pwsh", "-File", "/app/server.ps1"]
