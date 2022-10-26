param (
        [string]
        $Version = "5.4.1"
    )

$ErrorActionPreference = 'SilentlyContinue'

# Downloading CMD Runner
Invoke-WebRequest -URI http://search.maven.org/remotecontent?filepath=kg/apc/cmdrunner/2.2/cmdrunner-2.2.jar `
-UseBasicParsing -Outfile "C:\apache-jmeter-$Version\apache-jmeter-$Version\lib\cmdrunner-2.2.jar"

Write-Output "Downloaded CMD Runner"

# Downloading JMeter Plugins Manager
Invoke-WebRequest -URI https://jmeter-plugins.org/get/ `
-UseBasicParsing -Outfile "C:\apache-jmeter-$Version\apache-jmeter-$Version\lib\ext\jmeter-plugins-manager-1.4.jar"

Write-Output "Downloaded Plugins Manager"

# Changing directory
Set-Location "C:\apache-jmeter-$Version\apache-jmeter-$Version"

# Generating bat file for JMeter plugins
java -cp .\lib\ext\jmeter-plugins-manager-1.4.jar org.jmeterplugins.repository.PluginManagerCMDInstaller

Write-Output "Generated Plugins Manager bat file"

# Changing directory
Set-Location "C:\apache-jmeter-$Version\apache-jmeter-$Version\"

# Executing Plugin Manager
#java -jar ".\lib\cmdrunner-2.2.jar" --tool org.jmeterplugins.repository.PluginManagerCMD %*

# Installing Plugins
.\bin\PluginsManagerCMD.bat install bzm-parallel=0.9, `
jpgc-csl=0.1

Write-Output "Plugin installation complete."