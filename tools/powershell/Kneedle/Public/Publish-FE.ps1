<#
    .SYNOPSIS
        Copies FE Files from Project Root to Project Deploy.
    .DESCRIPTION
        Will copy all the generated FE files from the build folder source to the destination either server or docker.
    .EXAMPLE
        PS> Publish-FE
        Copy Fles
#>
Function Publish-FE {
    $LASTEXITCODE=0

    $FEBUILDFolderPath = "$(Get-ConfigValue -Key ProjectRoot)\build"
	$destination = "$(Get-ConfigValue -Key DeployRoot)\assets\$(Get-ConfigValue -Key ProjectName)-build"
	
	robocopy $FEBUILDFolderPath $destination /COPYALL /s /secfix
	Write-Output "Robocopy code:  $($LastExitCode)"

	exit 0
}
