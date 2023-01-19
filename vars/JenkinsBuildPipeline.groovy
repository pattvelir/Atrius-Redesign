import org.Velir.Gulp.*
import org.Velir.Npm.*

def call(Map pipelineParams) {

	npmTool = new NpmTool(steps)
	gulpTool = new GulpTool(steps)
	
	pipeline {
		agent any

		environment {
			WORKSPACE_PATH = "${env.WORKSPACE}"
			BUILD_NUMBER = "${env.BUILD_NUMBER}"
			JOB_NAME = "${env.JOB_NAME}"
		}

		stages {

			stage ('Checkout') {
				steps{
					script
					{
						checkout scm
					}
				}
			}

			stage ('Apply Jenkins Variables') {
				steps{
					script
					{
						env = pipelineParams.Environment
						powershell("""
							Import-Module $WORKSPACE_PATH\\tools\\powershell\\Kneedle\\Kneedle.psm1 -Force
							Set-WorkspacePath -Path $WORKSPACE_PATH -PropertiesFile $env
						""")
					}
				}
			}

			stage ('Apply Environment Configuration') {
				steps{
					bat 'nant init -D:env=' + pipelineParams.Environment
				}
			}

			stage ('Run NPM Install') {
				steps{
					script
					{
						npmTool.install(WORKSPACE_PATH)
					}

				}
			}

			stage ('Build FE Assets') {
				steps {
					script {
						bat "npm run build"
					}
				}
			}
			
			stage ('Copy FE Assets') {
				steps {
					script {
						powershell("""
							Import-Module $WORKSPACE_PATH\\tools\\powershell\\Kneedle\\Kneedle.psm1 -Force
							Publish-FE
						""")
					}
				}
			}
			
			stage ('Build Storybook') {
				steps {
					script {
						if (pipelineParams.DeployStorybook) {
							script {
								dir(WORKSPACE_PATH) {
									bat "npm run storybook"
								}
							}
						}
						else {
							echo "Storybook deployment has been skipped."
						}
					}
				}
			}

			stage ('Restore Nuget Packages') {
				steps {
					bat '"' + WORKSPACE_PATH + '/.nuget/nuget.exe" restore ./AtriusHealth.sln'
				}
			}

			stage ('Build/Publish Solution') {
				steps {
					script {
						powershell("""
							Import-Module $WORKSPACE_PATH\\tools\\powershell\\Kneedle\\Kneedle.psm1 -Force
							Publish-Project -All
						""")
					}
				}
			}
			
			stage ('Apply Xml Transformations') {
				steps {
					script {

						powershell("""
							Import-Module $WORKSPACE_PATH\\tools\\powershell\\Kneedle\\Kneedle.psm1 -Force
							Invoke-XdtTransform -XdtDllPath "C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\MSBuild\\Microsoft\\VisualStudio\\v17.0\\Web\\Microsoft.Web.XmlTransform.dll"
							exit 0
						""")
					}
				}
			}

			stage ('Execute Unicorn Sync') {
				steps {
					script {
						if (pipelineParams.SyncUnicorn)
						{
							powershell("""
								Import-Module $WORKSPACE_PATH\\tools\\powershell\\Kneedle\\Kneedle.psm1 -Force
								Sync-Unicorn
							""")
						}
						else
						{
							echo "Unicorn Sync has been skipped."
						}
					}
				}
			}
		}
	}
}