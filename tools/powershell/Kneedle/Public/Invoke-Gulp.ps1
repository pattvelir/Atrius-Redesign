<#
    .SYNOPSIS
        Executes Gulp command using the 'node' Docker container
    .DESCRIPTION
        Executes Gulp command using the 'node' Docker container defined in the 
        docker-compose.override.yml file provided with this project.  Allows user to 
        run Gulp without the need for installing NodeJS dependencies.
    .PARAMETER Command
        Gulp command, with arguments, to execute.
    .OUTPUTS
        Resulting ouput of the executed Gulp command
    .EXAMPLE
        PS> Invoke-Gulp -Command "build --no-watch"
        Outputs result of 'gulp build --no-watch'
#>
Function Invoke-Gulp {
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Command
    )
    
    $gulpCommand = ".\node_modules\.bin\gulp $Command"
    Invoke-Node $gulpCommand
}
