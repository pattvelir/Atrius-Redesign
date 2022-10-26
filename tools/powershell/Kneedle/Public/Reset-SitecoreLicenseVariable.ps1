<#
    .SYNOPSIS
        Clears the value of the 'SITECORE_LICENSE' environment variable 
    .DESCRIPTION
        A common runtime error when starting up Sitecore sites in Docker is a license-related
        error.  It appears that the environment variable 'SITECORE_LICENSE' somehow becomes
        truncated.  Resetting the environment variable and restarting the site, fixes this 
        issue.
    .PARAMETER NoStop
        A switch parameter.  If present, 'docker-compose down' will not be run before
        resetting the variable.
    .PARAMETER NoStart
        A switch parameter.  If defined, 'docker-compose up -d' will not be run after
        resetting the variable.
    .EXAMPLE
        Reset-SitecoreLicenseVariable

        Reset-SitecoreLicenseVariable -NoStop -NoStart
#>
Function Reset-SitecoreLicenseVariable {
    param(
        [switch]$NoStop,
        [switch]$NoStart
    )

    if(-Not $Nostop.IsPresent) {
        Invoke-Expression -Command "docker-compose down"
    }
    
    $env:SITECORE_LICENSE = ''
    
    if(-Not $NoStart.IsPresent) {
        Invoke-Expression -Command "docker-compose up -d"
    }    
}