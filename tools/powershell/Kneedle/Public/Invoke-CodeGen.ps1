<#
    .SYNOPSIS
        Runs Leprechaun CodeGen executable.
    .DESCRIPTION
        Wraps call to Leprechaun.Console.exe with relevant arguments for current project.
    .PARAMETER Watch
        If 'Watch' parameter is present, CodeGen will execute every time a change is detected
    .EXAMPLE
        Invoke-CodeGen

        Runs Leprechaun CodeGen and exits

        Invoke-CodeGen -Watch

        Runs Leprechaun CodeGen and continues to watch for changes
#>
Function Invoke-CodeGen {
    param (
        [switch]$Watch
    )
    
    $basePath = ".\\src\\Foundation\\CodeGen\\code"
    $exe = $basepath + "\\bin\\Debug\\Leprechaun.Console.exe"
    $config = $basePath + "\\Leprechaun.config"
    $watchFlag = ""
    if($Watch.IsPresent) {
        $watchFlag = "/w"
    }
    Invoke-Expression -Command "$exe /c $config /g $watchFlag"
}