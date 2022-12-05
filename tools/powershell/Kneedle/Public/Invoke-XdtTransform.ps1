<#
    .SYNOPSIS
        Performs all Xdt Transforms on config files in solution.
    .DESCRIPTION
        For each .xdt file found in any module in the solution will be transformed upon 
        the corresponding config file in the running Docker container.
    .PARAMETER Image
        Name of the container where the Xdt transform should be executed.
    .EXAMPLE
        PS> Invoke-XdtTransform
        Runs xdt transforms on configs found in the "cm" Docker container, by default.
    .EXAMPLE
        PS> Invoke-XdtTransform -Image "cd"
        Runs xdt transforms on configs found in the "cd" Docker container.
#>
Function Invoke-XdtTransform {
    param (
        [string]$Image = "cm",
        [string]$XdtDllPath
    )
    
    if($XdtDllPath) {
        $path = Get-ConfigValue "DeployRoot"
        @("Foundation","Feature","Project") | ForEach-Object { 
            Write-Host "Looking for transforms for layer: $_"
            If (Test-Path $PSScriptRoot\..\..\..\..\src\$_\*\code) { 
                Get-ChildItem $PSScriptRoot\..\..\..\..\src\$_\*\code | ForEach-Object { 
                    & $PSScriptRoot\..\Utilities\Invoke-XdtTransform.ps1 -Path $path -XdtPath $_.FullName -XdtDllPath $XdtDllPath
                    Write-Host "Applying transforms found at path: $_"
                }
            }
        }
    }
    else {
        $deployPath = Get-EnvVariable -Name "LOCAL_DEPLOY_PATH"

        Invoke-Expression "robocopy .\src $deployPath\website\temp\transforms /s /ndl /njh /njs *.xdt"

        $scriptPath = "$deployPath\website\temp\Transform.ps1"
        If (-Not (Test-Path $scriptPath)) {
            $scriptContent = -join('@("Foundation","Feature","Project") | ForEach-Object { Write-Host "Looking for transforms for layer: $_"; If (Test-Path C:\deploy\temp\transforms\$_\*\code) { Get-ChildItem C:\deploy\temp\transforms\$_\*\code | ForEach-Object { & C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath $_.FullName; Write-Host ', "'Applying transforms found at path: '", '$_.FullName', "; }; } }")
            $scriptContent = -join($scriptContent, "`n", 'Get-ChildItem c:\inetpub\wwwroot\temp\transforms\*\*\code -Recurse -Filter *.xdt | ForEach-Object { ($_.FullName -split "code")[1] } | Sort-Object -Unique | ForEach-Object { $_ -replace ".xdt", "" } | ForEach-Object { $source = -join("c:\inetpub\wwwroot", $_); $dest = -join("c:\deploy", $_); Copy-Item -Path $source -Destination $dest }')
            
            Set-Content -Path $scriptPath -Value $scriptContent            
        }

        Invoke-Expression -Command "docker-compose exec $Image powershell.exe /c .\temp\Transform.ps1"
    }
}
