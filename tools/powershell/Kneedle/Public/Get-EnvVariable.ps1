<#
    .SYNOPSIS
        Retrieves value of variable from Docker .env file.
    .DESCRIPTION
        Allows user and other scripts/functions to get environment-specific values
        without having to prompt the user
    .PARAMETER Name
        Name of variable in .env file
    .OUTPUTS
        Value of variable corresponding to the provided 'Name' parameter
    .EXAMPLE
        Get-EnvVariable -Name CM_HOST
#>
Function Get-EnvVariable {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Name
    )

    # Reading file as a single string:
    $sRawString = Get-Content .env | Out-String

    # The following line of code makes no sense at first glance 
    # but it's only because the first '\\' is a regex pattern and the second isn't. )
    $sStringToConvert = $sRawString -replace '\\', '\\'

    # And now conversion works.
    $htProperties = ConvertFrom-StringData $sStringToConvert

    return $htProperties[$Name]
}