# AtriusHealth for Sitecore

This repo is built off of the Velir Thread Starter but we have replaced some Gulp task with Rollup to take advantage of some newer javascript features.

Solution code for the Atrius Health Redesign.

## Prerequisites

// linting
$ npm run eslint
//or
$ npm run eslint -- --fix

### Docker Configuration Prerequisites

1. The `Containers` feature enabled in Windows. It can be enabled executing the following command in PowerShell as Administrator:
    -   `Enable-WindowsOptionalFeature -Online -FeatureName containers –All`

2. [Docker Desktop](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe) installed and configured with the following settings:
    - Switch to Windows container, right-clicking on the Docker Desktop icon in the hidden system icons in the taskbar and selecting `Switch to Windows containers...`.
    - Add a "dns" property in the Docker engine deamon: `"dns": ["8.8.8.8"]`, right-clicking on the Docker Desktop icon in the hidden system icons in the taskbar and selecting `Settings`.

      ![](./doc/images/docker-dns-setting-change.png)
    - Change "experimental" property to `true`.
    
    - Under Docker Desktop General Settings:
      - Ensure "Use the WSL 2 based engine" is checked.
      - Ensure "Use Docker Compose V2" is unchecked.

3. Hyper-V feature enabled (including Hyper-V hypervisor)
    - NOTE: Docker and VirtualBox cannot run successfully on a Windows host machine at the same time. This conflict can be resolved disabling Hyper-V hypervisor (if you want to run VirtualBox) or enabling it (if you want to run Docker, with the following commands to execute in a Command Prompt window as administrator (a machine restart is required after executing this command):
        - Disable command: `bcdedit /set hypervisorlaunchtype off`
        - Enable command: `bcdedit /set hypervisorlaunchtype auto`

### Local Environment Setup

1. Ensure you have completed all prerequisites.
2. Clone this repository to a directory of your choosing.  This location will be referred to as your **source** directory.
3. Double-click `start-knitting.bat` or open a Powershell window as Administrator in the root of your **source** directory. (`start-knitting.bat` opens a Powershell console window in Administrator mode and imports the Kneedle Powershell module.  For more info on Kneedle, read below.)
4. In your Powershell console, run `.\up.ps1 -IncludeDbBackups`.  (If this your first time running the script, you will be prompted for a path to your Sitecore license file, enter a valid path (e.g. C:\data\license\license.xml) and press 'Enter')

### FE Setup

1. Visit https://github.com/settings/tokens/new and create a Github Personal Access Token with *read:packages* permissions selected
2. On Windows, add a new environment variable named `GH_PAT` with the value of the Personal Access Token created in Step #1.
3. On a Mac, paste the token generated into your `.zshrc` or `.bash_profile` file. This will make the PAT token available for use in projects and make it possible to use Velir toolkit packages.

```
export GH_PAT=<GITHUB_TOKEN>
```
4. Run `npm install`.

### FE Commands

```bash
//Run dev server and storybook
$ npm start 
//or
$ npm run dev

//create production build
$ npm run build

//clean up dependencies and reinstall
$ npm run fresh-install

// linting
$ npm run eslint
//or
$ npm run eslint -- --fix

//and

$ npm run stylelint
//or
$ npm run stylelint -- --fix

// run storybook
$ npm run storybook

// convert design tokens from figma to css props
$ npm run convert:tokens

```

## Creating a New Site

1. From the Sitecore Content Editor, right-click the **Content** item and create a new site using the branch: `/sitecore/templates/Branches/Project/Atrius/Sites/New Site`.
2. Update `rootPath` attribute of website site, in the `/src/Project/Atrius/code/App_Config/Include/Project/Project.Atrius.config.template` or create a new Project module and add a `<site>` configuration to that project's config.
3. Right-click `Project.Atrius.config`, select **Properties** and set `Build Action` to `Content`.
4. Right-click on AtriusHealth.Project.Atrius, click **Publish...**.

## Powershell Module: Kneedle

Added to the solution is a Powershell module called "Kneedle". Kneedle replaces the Helix-based Gulp tasks from previous AtriusHealth versions and provides other helpers for managing your development environment.  To see an up-to-date list of available commands, first ensure your version of the module is up-to-date by running: `Import-Module .\tools\powershell\Kneedle\Kneedle.psm1 -Force`.  Then run, `Get-Command -Module Kneedle`. To see more information about a particular command, use the Powershell `Get-Help` function.  For example: `Get-Help Sync-Unicorn`.  

Double-clicking the `start-knitting.bat` in the root of the directory will automatically start a Powershell console in Administrator mode with the Kneedle Powershell module already imported.

## Working with your Local Environment

It's highly recommended you read the section **Powershell Module: Kneedle** before starting.  Review the available commands, and use the `Get-Help` function to see a detailed description of a command's functionality and relevant examples of it's usage.

### Publishing Code Changes

You can publish any single project from within Visual Studio by right-clicking the project and selecting the "Publish.." option.  

You can also use the Powershell command `Publish-Project` to publish you solution (This information can also be found by running `Get-Help Publish-Project -Full` in a Powershell console window):

1. Publish all projects in the solution: `Publish-Project -All`
2. Publish all projects in a single layer of the solution: `Publish-Project -Layer Foundation`
3. Publish a single project: `Publish-Project -Layer Foundation -Module Search`

### Exporting/Importing SQL Database Backups

You can easily refresh your local with data from extract backups for SQL databases in shared environments.

1. Export databases: `Export-SqlBacPacs -Server vwsql2019 -ClientKeyword "AtriusHealth" -EnvironmentKeyword "prod"`.  In this example, .bacpac files will be exported from vwsql2019 where database names contain "AtriusHealth" and "prod" and either "_core", "_master" or "_web". By default, these bacpacs will be created in the `.\tools\docker\data\backups` folder.  See also `Get-Help Export-SqlBacPacs -Full` for further information.

2. Import database .bacpac files: `Import-SqlBacPacs`.  Will loop over bacpac files found in `.\tools\docker\data\backups` and creates new version of either the Core, Master or Web databases. See also `Get-Help Import-SqlBacPacs -Full` for further information.

### Syncing Serialization Changes

AtriusHealth uses Unicorn to serialize/deserialize key Sitecore items.  Serialization of items will occur automatically on item changes.  Serialization/deserialization task can be done manually by visiting `/unicorn.aspx` in a browser.

Syncing all Unicorn changes to your local Sitecore environment can also initiated from Powershell by executing `Sync-Unicorn`.  See also `Get-Help Sync-Unicorn -Full` for further information.

### Running Code Generation Tasks

AtriusHealth uses Leprechaun to generate Concrete custom models that represent all project-specific Sitecore templates.  The CodeGen task can be executed in one of two ways:

1. From a Powershell console window, execute `Invoke-CodeGen`.  This will regenerate all models.
2. From a Powershell console window, execute `Invoke-CodeGen -Watch`.  This will regenerate all models and continue to watch for any changes to serialized template files.  If changes are deteced, the models associated project's `Templates.cs` file will be regenerated.

See also `Get-Help Invoke-CodeGen -Full` for further information.
