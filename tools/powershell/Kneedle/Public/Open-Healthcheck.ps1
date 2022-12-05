<#
    .SYNOPSIS
        Opens a browser window to the '/healthz/ready' page.
    .DESCRIPTION
        Opens a browser window to the '/healthz/ready' page.  Helpful for troubleshooting when certain containers
        are marked as unhealthy by Docker.
    .PARAMETER Image
        Optional parameter with default value of 'cm'. Must be a valid image defined in the docker-compose.yaml file.
    .OUTPUTS
        Opens a browser window to the '/healthz/ready' page.
    .EXAMPLE
        PS> Open-Healthcheck -Image "cd"
#>
Function Open-Healthcheck {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        [string]$Image = "cm"
    )

    $projectName = Get-EnvVariable -Name "COMPOSE_PROJECT_NAME"
    $json = (docker inspect "${projectName}_${Image}_1") | Out-String | ConvertFrom-Json

    $ipAddress = $json.NetworkSettings.Networks."${projectName}_default".IPAddress

    Start-Process "http://${ipAddress}/healthz/ready"
}
