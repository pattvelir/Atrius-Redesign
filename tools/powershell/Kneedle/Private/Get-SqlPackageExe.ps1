Function Get-SqlPackageExe {
    
    $sqlpackage = (get-childitem 'C:\Program Files\Microsoft SQL Server' -Recurse | Where-Object {$_.name -eq 'sqlpackage.exe'} | Sort-Object $_.VersionInfo.FileVersionRaw -Descending | Select-Object -First 1).FullName
    if([string]::IsNullOrWhiteSpace($sqlpackage)) {
        $sqlpackage = (get-childitem 'C:\Program Files (x86)\Microsoft SQL Server' -Recurse | Where-Object {$_.name -eq 'sqlpackage.exe'} | Sort-Object $_.VersionInfo.FileVersionRaw -Descending | Select-Object -First 1).FullName
    }
    
    if($sqlpackage -eq '') {
        Write-Host "SqlPackage.exe not found." -ForegroundColor Red
        Break
    }

    return $sqlpackage
}
