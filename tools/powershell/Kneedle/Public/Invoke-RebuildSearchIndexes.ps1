<#
    .SYNOPSIS
        Rebuilds all search indexes
    .DESCRIPTION
        Rebuilds all search indexes defined in the Sitecore solution.
    .EXAMPLE
        PS> Invoke-RebuildSearchIndexes
#>
Function Invoke-RebuildSearchIndexes {
    
    $baseUrl = "https://$(Get-EnvVariable -Name CM_HOST)"
    $userName = "admin"
    $password = $(Get-EnvVariable -Name SITECORE_ADMIN_PASSWORD)

    Invoke-SitecoreUrlTask -SitecoreInstanceRoot $baseUrl -SitecoreActionPath "sitecore/admin/RebuildAllSearchIndexes.aspx" -Username $userName -Password $password
}
