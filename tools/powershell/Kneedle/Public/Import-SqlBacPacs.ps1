<#
    .SYNOPSIS
        Imports .bacpac files for databases that match the specified query terms.
    .DESCRIPTION
        Finds all .bacpac files in backups directory and imports into specified database
        instance.
    .PARAMETER Server
        Server where target databases reside. Default value is "localhost,44010".
    .PARAMETER BackupsDirectory
        Specifies folder where bacpac files are stored.
    .PARAMETER DataDirectory
        Specifies folder where database .mdf and .ldf files are stored.
    .OUTPUTS
        N/A
    .EXAMPLE
        Import-SqlBacPacs
#>
Function Import-SqlBacPacs {
    param(
        [string] $Server = 'localhost,14330',
        [string] $BackupsDirectory="$(Get-EnvVariable -Name "LOCAL_DATA_PATH")\backups",
        [string] $DataDirectory="$(Get-EnvVariable -Name "LOCAL_DATA_PATH")\mssql"
    )
 
    #get the sqlpackage executable
    $sqlpackage = Get-SqlPackageExe
    
    if($sqlpackage -eq '') {
        Break
    }

    $sqlPwd = (Get-EnvVariable -Name "SQL_SA_PASSWORD")

    Get-ChildItem -Path $BackupsDirectory -Filter "*.bacpac" | ForEach-Object {
        $databaseFileName = ""
        if ($_.BaseName -like "*master*") {
            $databaseFileName = "Sitecore.Master_Primary"
        }
        
        if ($_.BaseName -like "*web*") {
            $databaseFileName = "Sitecore.Web_Primary"
        }
        
        if ($_.BaseName -like "*core*") {
            $databaseFileName = "Sitecore.Core_Primary"
        }

        if($databaseFileName -ne '') {
            $databaseName = $databaseFileName.Replace("_Primary", "")

            # Detach database
            Invoke-Sqlcmd -ServerInstance $Server -Username "sa" -Password $sqlPwd -Query "ALTER DATABASE [$databaseName] SET  SINGLE_USER WITH ROLLBACK IMMEDIATE EXEC MASTER.dbo.sp_detach_db @dbname = N'$databaseName', @keepfulltextindexfile = N'false'"

            Remove-Item -Path "$($DataDirectory)\$($databaseFileName).mdf"
            Remove-Item -Path "$($DataDirectory)\$($databaseFileName).ldf"

            Write-Host "Importing bacpac for $databaseFileName" -ForegroundColor Green 
            & "$sqlpackage" /a:Import /sf:"$($_.FullName)" /tsn:"$Server" /tdn:"$databaseName" /tu:"sa" /tp:"$sqlPwd"
        }            
    }

    Write-Host "Finished importing bacpac(s)." -ForegroundColor Green
}