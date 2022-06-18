const generateSidebar = require('./generateSidebar')
const generatePlugins = require('./generatePlugins')
const packageJson = require('../../package.json')

const base = `/${packageJson.name}/`

async function generateVueConfig() {
  return {
    base,
    title: packageJson.title || packageJson.name,
    description: packageJson.description,
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Github', link: packageJson.homepage }
      ],
      sidebar: await generateSidebar()
    },
    plugins: await generatePlugins()
  }
}

module.exports = generateVueConfig
