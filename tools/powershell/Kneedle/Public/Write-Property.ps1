<#
    .SYNOPSIS
        Writes a specific property value to a Nant properties file.
    .DESCRIPTION
        Writes a specific property value to a Nant properties file.
    .PARAMETER FileName
        Optional parameter with default value of 'local'. File must exist in the .\config\env directory.
        e.g. '.\config\env\local.properties'
    .PARAMETER PropertyName
        Required parameter. Name of <property> in the properties file.
    .PARAMETER PropertyValue
        Required parameter. Value to be written to the <property> element with 'name' attribute
        matching the 'PropertyName' parameter.
    .OUTPUTS
        Writes user-provided value back to the properties file specified by the FileName parameter.
    .EXAMPLE
        PS> Write-Property -PropertyName "Project.SourceRoot" -PropertyValue "C:\Data\Projects\AtriusHealth"
#>
Function Write-Property {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        $FileName = "local",
        [Parameter(Mandatory = $true)]
        [string]
        $PropertyName,
        [Parameter(Mandatory = $true)]
        [string]
        $PropertyValue
    )

    $filePath = "$PSScriptRoot\..\..\..\..\config\env\$FileName.properties"

    [System.Xml.XmlDocument]$fileContents = Get-Content -Path $filePath

    $property = $fileContents.DocumentElement.SelectSingleNode("//property[@name='$PropertyName']")

    $property.SetAttribute("value", $PropertyValue)

    $fileContents.Save($filePath)
}
