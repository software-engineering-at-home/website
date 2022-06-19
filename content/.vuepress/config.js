const generateSidebar = require('./generateSidebar')
const generatePlugins = require('./generatePlugins')
const packageJson = require('../../package.json')

const base = `/${packageJson.name}/`

const iconSizes = [{
  type: 'link',
  properties: {
    rel: 'apple-touch-icon',
    href: '/assets/apple-icon-${size}x${size}.png',
    size: '${size}x${size}'
  },
  sizes: [57, 60, 72, 76, 114, 120, 144, 152, 180]
}, {
  type: 'link',
  properties: {
    rel: 'icon',
    type: 'image/png',
    href: '/assets/favicon-${size}x${size}.png',
    size: '${size}x${size}'
  },
  sizes: [16, 32, 96],
}, {
  type: 'link',
  properties: {
    rel: 'icon',
    type: 'image/png',
    href: '/assets/android-icon-${size}x${size}.png',
    size: '${size}x${size}'
  },
  sizes: [192],
}, {
  type: 'meta',
  properties: {
    name: 'msapplication-TileImage',
    content: '/assets/ms-icon-${size}x${size}.png',
    size: '${size}x${size}'
  },
  sizes: [70, 144, 150, 310]
}]

function makeIconLinksInAllSizes(iconSizes) {
  const result = [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#EECE61"}],
    ['meta', { name: "msapplication-config", content: "/ms-icon-144x144.png"}],
    ['meta', { name: "theme-color", content: "#EECE61"}]
  ]
  iconSizes.forEach(iconSize => {
    iconSize.sizes.forEach(size => {
      const properties = Object.assign({}, iconSize.properties)
      Object.keys(properties).forEach(prop => {
        properties[prop] = properties[prop].replaceAll('${size}', size)
      })
      const item = [iconSize.type, properties]
      result.push(item)
    })
  })
  return result
}

async function generateVueConfig() {
  return {
    base,
    title: packageJson.title || packageJson.name,
    description: packageJson.description,
    head: makeIconLinksInAllSizes(iconSizes),
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
