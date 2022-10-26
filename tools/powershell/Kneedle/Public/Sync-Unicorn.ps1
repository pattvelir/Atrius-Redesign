<#
    .SYNOPSIS
        Runs Unicorn sync on Docker Sitecore enivornment
    .DESCRIPTION
        A wrapper function around the Powershell script found with the Unicorn project
        to sync the serialization items to a running Sitecore environment.
    .EXAMPLE
        Sync-Unicorn
#>
Function Sync-Unicorn {
    $LASTEXITCODE=0

    $unicornUrl = "$(Get-ConfigValue -Key SiteAddress)/unicorn.aspx"

    Invoke-Expression -Command "$PSScriptRoot\..\..\..\unicorn\Sync.ps1 -url $unicornUrl"

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Serialization push failed, see errors above."
    }    
}