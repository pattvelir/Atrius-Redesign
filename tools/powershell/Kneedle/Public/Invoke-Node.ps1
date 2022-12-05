<#
    .SYNOPSIS
        Executes NodeJS command using the 'node' Docker container
    .DESCRIPTION
        Executes NodeJS command using the 'node' Docker container defined in the 
        docker-compose.override.yml file provided with this project.  Allows user to 
        run NodeJS without the need for installing any NodeJS dependencies.
    .PARAMETER Command
        NodeJS command, with arguments, to execute.
    .OUTPUTS
        Resulting ouput of the executed NodeJS command
    .EXAMPLE
        PS> Invoke-Node -Command "--version"
        6.14.10
#>
Function Invoke-Node {
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Command
    )
    
    Invoke-Expression -Command "docker-compose run --rm node cmd.exe /c $Command"
}
