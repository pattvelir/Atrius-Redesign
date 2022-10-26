<#
    .SYNOPSIS
        Jenkins helper-method. Writes current working directory to Nant properties file.
    .DESCRIPTION
        Jenkins helper-method. Replaces any instances of '{{Jenkins.WORKSPACE}}' in a 
        given Nant properties file with the current working directory.
    .PARAMETER Path
        Required parameter. 
    .PARAMETER PropertiesFile
        Required parameter. File must exist in the .\config\env directory.
        e.g. '.\config\env\local.properties'
    .OUTPUTS
        Writes 'Path' value to the properties file specified by the 'PropertiesFile' parameter.
    .EXAMPLE
        Set-WorkspacePath -Path "C:\Jenkins\workspaces\DEV" -PropertiesFile "dev"
#>
Function Set-WorkspacePath {
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Path,
        [Parameter(Mandatory = $true)]
        [string]
        $PropertiesFile
    )

    $filePath = "$PSScriptRoot\..\..\..\..\config\env\$PropertiesFile.properties"

    ((Get-Content -path $filePath -Raw) -replace '{{Jenkins.WORKSPACE}}',$Path) | Set-Content -Path $filePath
}