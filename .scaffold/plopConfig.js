const fs = require('fs')
const path = require('path')
const {
  directoryPath,
  extensions,
  projects,
  httpVerbs,
  seperateFolderList,
} = require('./package-constants')

const getConfig = async () => {
  let data = await fs.readFileSync(directoryPath, 'utf-8')
  data = data && JSON.parse(data.toString())
  return data
}

const saveConfig = async (data) => {
  ensureDirectoryExistence(directoryPath)
  data = JSON.stringify(data, null, 2)
  await fs.writeFileSync(directoryPath, data)
}

const ensureDirectoryExistence = (filePath) => {
  let dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
} 
const setupAction = (plop)=>(setting) =>
plop.setActionType(setting, async (answers, config, plop) => {
  //get latest config
  let data = await getConfig()
   try {
    saveConfig({ ...data, [setting]: answers[setting] })
  } catch {
    console.log('OOPS')
  }
  return 'added successfully'
})


module.exports = {
  defaults: {
    serviceType: 0,
    extension: 'jsx',
    project: 'react',
    sourceDir: 'frontend',
    componentsPath: 'frontend/js/components',
    hooksPath: 'frontend/js/hooks',
    contextsPath: 'frontend/js/contexts',
    servicesPath: 'frontend/js/services',
    importStyles: true,
  },
  frameworks: projects,
  getConfig,
  availableTypes: () => {
    return httpVerbs
  },
  availableseperateFolderList: () => {
    return seperateFolderList
  },
  availableExtensions: (option) => {
    return option && option.includes('*') ? extensions : ['js', 'ts']
  },
  helpers: (plop) => {
    /*
     * setup plop action
     * @param setting {string}
     * Usage:
     * setupAction("project");
     */
  
    plop.setHelper('switch', function (value, options) {
      this.switch_value = value
      this.switch_break = false
      return options.fn(this)
    })

    plop.setHelper('upperCase', function (text) {
      return text.toUpperCase()
    })

    plop.setHelper('lowerCase', function (text) {
      return text.toLowerCase()
    })

    plop.setHelper('extensionSplit', function (text) {
      return text.includes('x') ? text.split('x')[0] : text
    })

    plop.setHelper('case', function (value, options) {
      if (value === this.switch_value) {
        this.switch_break = true
        return options.fn(this)
      }
    })

    plop.setHelper('default', function (value, options) {
      if (this.switch_break === false) {
        return value
      }
    })
    const plopAction=setupAction(plop);
    plopAction('project')
    plopAction('extension')
    plopAction('componentsPath')
    plopAction('hooksPath')
    plopAction('contextsPath')
    plopAction('servicesPath')
    plopAction('isImportStyles')

    return
  },
  ...getConfig(),
}
