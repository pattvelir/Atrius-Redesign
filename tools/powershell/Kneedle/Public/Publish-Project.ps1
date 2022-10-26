<#
    .SYNOPSIS
        Executes MSBuild build and FileSystem deploy for the solution. 
    .DESCRIPTION
        Allows user publish changes made in the solution to their local development
        environment.  Users can publish the entire solution, an entire Helix Layer,
        or a single module.
    .PARAMETER All
        A switch parameter.  If present, the entire solution will be built/published.
    .PARAMETER Layer
        Optional parameter.  If defined, will build/publish all modules within that layer.
    .PARAMETER Module
        Optional parameter.  Used in conjunction with the 'Layer' parameter, will build/publish
        a single module.
    .EXAMPLE
        Publish-Project -All

        All modules in the solution will be build/published to site.

        Publish-Project -Layer "Feature"

        All modules defined at the Feature layer of the project will be built/published to
        the site.

        Publish-Project -Layer "Feature" -Module "Search"

        Only the Search Feature module will be built/published to the site.
#>
Function Publish-Project {
    param(
        [switch]$All,
        [string]$Layer = "",
        [string]$Module = ""
    )

    $configuration = Get-ConfigValue -Key "BuildConfiguration"
    $buildParameters = "/p:Configuration=$configuration /p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishProfile=Local"

    if($All.IsPresent) {
        $slnToBuild = Get-ChildItem -Filter *_FastBuild.proj -Name | Select-Object -First 1
        if($null -eq $slnToBuild) {
            $slnToBuild = Get-ChildItem -Filter *.sln -Name | Select-Object -First 1
        }

        if($null -ne $slnToBuild) {
            Invoke-MsBuild -Path ".\$slnToBuild" -MsBuildParameters $buildParameters -ShowBuildOutputInCurrentWindow
        }
        else {
            Write-Error "Failed to find solution file."
        }
    }
    elseif ($Layer -ne "") {
        if($Module -ne "") {
            Get-ChildItem -Filter "src\$Layer\$Module\code\*.csproj" | Foreach-Object { Invoke-MsBuild -Path $_.FullName -MsBuildParameters $buildParameters -ShowBuildOutputInCurrentWindow }
        }
        else {
            Get-ChildItem -Filter "src\$Layer\*" | Foreach-Object { 
                $path = "src\$Layer\" + $_.Name + "\code\*.csproj"
                $proj = Get-ChildItem -Filter $path | Select-Object -First 1
                Invoke-MsBuild -Path $proj.FullName -MsBuildParameters $buildParameters -ShowBuildOutputInCurrentWindow }
        }        
    }
    else {
        Write-Error "Please supply the 'All' flag or specify a Layer (Options are Foundation, Feature, Project)"
    }
}