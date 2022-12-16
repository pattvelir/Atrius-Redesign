param(
        [switch]$IncludeDbBackups
    )

$ScriptPath = Split-Path $MyInvocation.MyCommand.Path

Import-Module $ScriptPath\tools\powershell\Kneedle\Kneedle.psm1 -Force

# ENSURE local.properties FILE EXISTS
if(-not (Test-Path $ScriptPath\config\env\local.properties)) {
    Copy-Item $ScriptPath\config\env\local.properties.example -Destination $ScriptPath\config\env\local.properties | Out-Null

    Write-Property -PropertyName "Project.SourceRoot" -PropertyValue $ScriptPath
    Update-Properties
}

# ENSURE ENV FILE EXISTS
if(-not (Test-Path .env)) {
    Copy-Item .env.example -Destination .env | Out-Null
    Invoke-Expression ".\init.ps1"
}

Write-Host "Running nant init" -ForegroundColor Green

Invoke-Expression ".\nant.bat init"

$cmUrl = "https://$(Get-EnvVariable -Name CM_HOST)"

# Build all containers in the Sitecore instance, forcing a pull of latest base containers
Write-Host "Building Docker containers..." -ForegroundColor Green
#docker-compose build
if ($LASTEXITCODE -ne 0)
{
    Write-Error "Container build failed, see errors above."
    exit
}

# Prevent runtime error when Sitecore License environment variable becomes mysteriously truncated
Reset-SitecoreLicenseVariable -NoStop -NoStart

# Run the docker containers
Write-Host "Starting Docker containers..." -ForegroundColor Green
docker-compose up -d

# Wait for Traefik to expose CM route
Write-Host "Waiting for CM to become available..." -ForegroundColor Green
$startTime = Get-Date
do {
    Start-Sleep -Milliseconds 100
    try {
        $status = Invoke-RestMethod "http://localhost:8079/api/http/routers/cm-secure@docker"
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -ne "404") {
            throw
        }
    }
} while ($status.status -ne "enabled" -and $startTime.AddSeconds(15) -gt (Get-Date))
if (-not $status.status -eq "enabled") {
    $status
    Write-Error "Timeout waiting for Sitecore CM to become available via Traefik proxy. Check CM container logs."
}

if($IncludeDbBackups.IsPresent) {
    Write-Host "Extracting production SQL bacpacs..." -ForegroundColor Green

    Export-SqlBacPacs -Server "VELBOS-SQL1901" -ClientKeyword "AtriusHealth" -EnvironmentKeyword "prod"
    
    Write-Host "Importing production SQL bacpacs..." -ForegroundColor Green
    
    Import-SqlBacPacs    
}

Write-Host "Restoring NuGet packages..." -ForegroundColor Green
.nuget\nuget.exe restore .\AtriusHealth.sln

Write-Host "Building Solution..." -ForegroundColor Green

Publish-Project -All

Write-Host "Appyling XDT Transforms to configs..." -ForegroundColor Green

Invoke-XdtTransform

Write-Host "Pushing latest items to Sitecore..." -ForegroundColor Green

Sync-Unicorn

Write-Host "Populating SOLR Managed Schema..." -ForegroundColor Green

Invoke-PopulateSolrManagedSchema

Write-Host "Rebuilding Search Indexes..." -ForegroundColor Green

Invoke-RebuildSearchIndexes

Write-Host "Opening site..." -ForegroundColor Green

$sitecoreUrl = "${cmUrl}/sitecore/"
Start-Process $sitecoreUrl
Start-Process $cmUrl

# Write-Host "Waiting for Storybook to become available..." -ForegroundColor Green

# $storybookUrl = "http://localhost:3030"

# $startTime = Get-Date
# do {
#     Start-Sleep -Milliseconds 500
#     try {
#         $response = Invoke-WebRequest -URI $storybookUrl -Method Get
#     } catch {
#         if ($_.Exception.Response.StatusCode.value__ -ne "404") {
#             throw
#         }
#     }
# } while ($response.StatusCode -ne 200 -and $startTime.AddSeconds(500) -gt (Get-Date))
# if (-not $response.StatusCode -eq 200) {
#     $response.StatusDescription
#     Write-Error "Timeout waiting for Storybook to build. Check storybook container logs."
# }
# else {
#     Start-Process $storybookUrl
# }
