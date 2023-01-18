Function Read-Properties {
    [CmdletBinding()]
    param (
        [Parameter()]
        [string]
        $FileName = "local"
    )

    [xml]$fileContents = Get-Content -Path "$PSScriptRoot\..\..\..\..\config\env\$FileName.properties"

    return $fileContents | Select-Xml -XPath "//property[@value='[CHANGEME]']"
}
