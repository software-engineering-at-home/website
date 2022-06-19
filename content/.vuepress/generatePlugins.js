const path = require('path')

function generatePlugins() {
  const componentsDir = path.join(__dirname, '../components')
  console.log('Locating components in:', componentsDir)
  const registerComponents = [
    '@vuepress/plugin-register-components', {
      componentsDir
    }
  ]
  return [
    registerComponents
  ]
}

module.exports = generatePlugins
