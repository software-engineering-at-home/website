const fs = require('fs')
const path = require('path')
const md2json = require('@connected-web/md2json')

function readFile (filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  } catch (ex) {
    return false
  }
}

function getTitleFor (folder, folderpath) {
  const readmePath = path.join(folderpath, 'README.md')
  const readmeContents = readFile(readmePath)
  const readmeTokens = md2json.tokens(readmeContents)
  return readmeTokens[0]?.text || folder || 'Site Root'
}

function keepValidChildren(folder, item) {
  const extension = ['.md']
  const filepath = path.join(__dirname, '..', folder, item)
  const isReadme = item.toLowerCase() === 'readme.md'
  const isFile = fs.statSync(filepath).isFile()
  const hasMatchingFileExt = extension.includes(path.extname(item))
  return !isReadme && isFile && hasMatchingFileExt
}

async function getSideBar (folder) {
  const folderPath = path.join(__dirname, '..', folder)
  const title = getTitleFor(folder, folderPath)

  const files = fs.readdirSync(folderPath)
  const children = files
    .filter(item => keepValidChildren(folder, item))
    .map(item => `/${folder}/${item}`.replace('//', ''))

  return { title: title, children: [`/${folder}/`.replace('//', ''), ...children] }
}

function previewSidebarConfig (sidebar) {
  const previewFilepath = path.join(__dirname, 'sidebar-preview.json')
  fs.writeFileSync(previewFilepath, JSON.stringify(sidebar, null, 2), 'utf8')
}

async function generateSidebar () {
  const docsPath = path.join(__dirname, '..')
  const files = fs.readdirSync(docsPath)
  const folders = files.filter((folder) => {
    const filepath = path.join(__dirname, '..', folder)
    const isDirectory = fs.statSync(filepath).isDirectory()
    const isHiddenDirectory = folder.charAt(0) === '.'
    const readmepath = path.join(filepath, 'README.md')
    let hasReadme
    try {
      hasReadme = fs.statSync(readmepath).isFile()
    } catch (ex) {
      console.error('No README.md file found in', folder)
    }
    return isDirectory && hasReadme && !isHiddenDirectory
  })

  const sidebar = await Promise.all([
    getSideBar(''),
    ...folders.map(folder => getSideBar(folder))
  ])

  previewSidebarConfig(sidebar)

  return sidebar
}

module.exports = generateSidebar
