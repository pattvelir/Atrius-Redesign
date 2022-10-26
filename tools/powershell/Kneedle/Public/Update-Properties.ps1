<#
    .SYNOPSIS
        Prompts user for properties that require values in a Nant properties file.
    .DESCRIPTION
        Reads a given Nant properties file, prompts user for new values for any properties
        values containing the value '[CHANGEME]' and writes user-provided value back to file.
    .PARAMETER FileName
        Optional parameter with default value of 'local'. File must exist in the .\config\env directory.
        e.g. '.\config\env\local.properties'
    .OUTPUTS
        Writes user-provided values back to the properties file specified by the FileName parameter.
    .EXAMPLE
        Update-Properties
#>
Function Update-Properties {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        $FileName = "local"
    )

    $properties = Read-Properties -FileName $FileName

    $properties | ForEach-Object {
        $propertyName = $_.Node.GetAttribute("name")
        $commentNode = $_.Node.NextSibling
        
        $prompt = "Provide value for property '$propertyName'"
        if($commentNode -And $commentNode.Name -eq "#comment") {
            $comment = $commentNode.InnerText
            $prompt = "$prompt ($comment)"
        }
        
        $value = Read-Host -Prompt $prompt

        Write-Property -FileName $FileName -PropertyName $propertyName -PropertyValue $value
    }
}