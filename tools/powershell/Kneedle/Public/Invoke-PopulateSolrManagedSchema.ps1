<#
    .SYNOPSIS
        Populates SOLR's managed schema
    .DESCRIPTION
        Populates SOLR's managed schema.  This is a necessary step when
        first setting up Sitecore/SOLR.
    .EXAMPLE
        Invoke-PopulateSolrManagedSchema
#>
Function Invoke-PopulateSolrManagedSchema {
    
    $baseUrl = "https://$(Get-EnvVariable -Name CM_HOST)"
    $userName = "admin"
    $password = $(Get-EnvVariable -Name SITECORE_ADMIN_PASSWORD)

    Invoke-SitecoreUrlTask -SitecoreInstanceRoot $baseUrl -SitecoreActionPath "sitecore/admin/PopulateManagedSchema.aspx?indexes=all" -Username $userName -Password $password
}