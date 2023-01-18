Function Get-ConfigValue {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]
        $Key
    )

    $json = Get-Content -Path "$PSScriptRoot\..\config.json" | Out-String | ConvertFrom-Json

    return $json.$Key
}
