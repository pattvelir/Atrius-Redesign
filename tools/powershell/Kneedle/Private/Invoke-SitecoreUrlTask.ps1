Function Invoke-SitecoreUrlTask {
    [Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingUserNameAndPassWordParams','')]
    [Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingPlainTextForPassword','')]
    [CmdletBinding(SupportsShouldProcess=$true)]
    param(
        [Parameter(Mandatory=$true)]
        [string]$SitecoreInstanceRoot,
        [Parameter(Mandatory=$true)]
        [string]$SitecoreActionPath,
        [Parameter(Mandatory=$true)]
        [string]$Username,
        [Parameter(Mandatory=$true)]
        [string]$Password
    )

    $actionPage = "$SitecoreInstanceRoot/$SitecoreActionPath"

    if($PSCmdlet.ShouldProcess("$actionPage", "Invoke-SitecoreUrlTask")) {

        function GetAuthorizedSession {

            Write-Host "Authenticating" -ForegroundColor Green
            $uri = "$SitecoreInstanceRoot/sitecore/login?fbc=1"
            $authResponse = Invoke-WebRequest -uri $uri -SessionVariable session -UseBasicParsing
            TestStatusCode $authResponse

            # Set login info
            $fields = @{}
            $authResponse.InputFields.ForEach({
                if(Get-Member -inputobject $_ -name "Value" -Membertype Properties){
                    $fields[$_.Name] = $_.Value
                }
                else {
                    $fields[$_.Name] = ""
                }
            })

            $fields.UserName = $Username
            $fields.Password = $Password

            # Login using the same session
            $authResponse = Invoke-WebRequest -uri $uri -WebSession $session -Method POST -Body $fields -UseBasicParsing -MaximumRedirection 0 -ErrorAction Ignore
            TestStatusCode $authResponse -StatusCode 302
            TestCookie $session.Cookies

            return $session
        }

        function TestStatusCode {
            param($response,
            $StatusCode = 200)

            if($response.StatusCode -ne $StatusCode) {
                throw "The request returned a non-200 status code [$($response.StatusCode)]"
            }
        }

        function TestCookie {
            param([System.Net.CookieContainer]$cookies)

            $discovered = @($cookies.GetCookies($SitecoreInstanceRoot) |
                Where-Object { $_.Name -eq '.ASPXAUTH' -Or $_.Name -eq '.AspNet.Cookies' })

            if($discovered.Count -ne 1){
                throw "Authentication failed. Check username and password"
            }
        }

        try {

            # Get an authorized session
            $authSession = GetAuthorizedSession

            # Use the session to perform the actual request
            Write-Host "Requesting $actionPage" -ForegroundColor Green
            $actionResponse = Invoke-WebRequest -uri $actionPage -WebSession $authSession -UseBasicParsing
            TestStatusCode $actionResponse

            Write-Host "Completed Request Successfully" -ForegroundColor Green
        }
        catch {
            Write-Error -Message ("Error requesting $actionPage" + ": $($_.Exception.Message)")
        }
    }
}
