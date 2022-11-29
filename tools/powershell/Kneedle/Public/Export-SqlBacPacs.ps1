<#
    .SYNOPSIS
        Generates .bacpac files for databases that match the specified query terms.
    .DESCRIPTION
        Queries SQL Server on the $Server and generates .bacpac file for each database whose name
        matches $ClientKeyword and $EnvironmentKeyword and matches any value in the $Databases array.
    .PARAMETER Server
        Server where target databases reside. Default value is "localhost".
    .PARAMETER ClientKeyword
        Keyword to identify which client databases to export.  Default value uses the COMPOSE_PROJECT_NAME value from the .env file.
    .PARAMETER EnvironmentKeyword
        Keyword to identify which which environment to target when searching for databases to target.  Default value = "uat". 
    .PARAMETER Databases
        String array of database keywords to export.  Default values are "_core", "_master", "_web". 
    .PARAMETER OutputDirectory
        Specifies destination for exported bacpac files.
    .OUTPUTS
        .bacpac files for each database matching keywords provided.
    .EXAMPLE
        PS> Export-SqlBacPacs -Server "vwmysqlserver" -ClientKeyword "AtriusHealth" -EnvironmentKeyword "dev"
#>
Function Export-SqlBacPacs {
    param(
        [string] $Server = 'localhost',
        [string] $ClientKeyword = (Get-EnvVariable -Name "COMPOSE_PROJECT_NAME"),
        [string] $EnvironmentKeyword = "uat",
        [string[]] $Databases = @("[_]core", "[_]master", "[_]web"),
        [string] $OutputDirectory="$(Get-EnvVariable -Name "LOCAL_DATA_PATH")\backups"
    )
 
    #get the sqlpackage executable
    $sqlpackage = Get-SqlPackageExe
    
    if($sqlpackage -eq '') {
        Break
    }

    $dbSqlWhereClause = ""
    if($Databases.Length -gt 0) {
        $dbSqlWhereClause = "and (name like '%" + ($Databases -join "%' or name like '%") + "%')"
    }
    
    #declare a select query for databases
    $dbsql = @"
    SELECT name FROM sys.databases
    where database_id >4 and state_desc = 'ONLINE' and name like '%$ClientKeyword%' and name like '%$EnvironmentKeyword%' $dbSqlWhereClause
"@

    #set processing variables
    $dbs = Invoke-Sqlcmd -ServerInstance $Server -Database tempdb -Query $dbsql
    $datestring =  (Get-Date -Format 'yyyyMMddHHmm')
    $iname = $Server.Replace('\','_')

    if($null -ne $dbs -and $dbs.Length -gt 0) {
        #extract each db
        foreach($db in $dbs.name) {
            $outfile = Join-Path $outputdirectory -ChildPath "$iname-$db-$datestring.bacpac"
            $cmd = "& '$sqlpackage' /action:Export /targetfile:'$outfile' /SourceServerName:$Server /SourceDatabaseName:$db"
            Write-Host "Generating bacpac for $db" -ForegroundColor Green 
            Invoke-Expression $cmd
        }

        Write-Host "Finished exporting bacpac(s) to $OutputDirectory" -ForegroundColor Green 
    }
    else {
        Write-Host "No matching databases found." -ForegroundColor Red 
    }
    
}
