/* Run this from the root using: node models/parse-markdown-files.js */
const { find, clean, make, read, write, position } = require('promise-path')
const { convertMarkdownToDocument } = require('./utils/markdown2json')

async function convertMarkdownFileToJsonFile (inputpath, outputpath) {
  const markdown = await read(inputpath, 'utf8')
  const document = convertMarkdownToDocument(markdown)
  const output = JSON.stringify(document, null, 2)
  await write(outputpath, output, 'utf8')
  return {
    document,
    source: inputpath,
    output: outputpath,
    size: output.length
  }
}

async function parseMarkdownFiles (searchpattern) {
  searchpattern = searchpattern || '**/*.md'

  const root = position(__dirname, '..')
  const outputdir = root('models/generated/')
  const files = (await find(searchpattern)).filter(n => !n.includes('node_modules'))

  await clean(outputdir)
  await make(outputdir)

  console.log('[Parse Markdown Files]')
  console.log('Creating JSON versions of markdown files for verification and validation')
  console.log('  Found files:', searchpattern, files)
  console.log('')

  const work = files.map(async (filepath) => {
    const outputname = filepath.toLowerCase().split('.')[0] + '.json'
    const outputpath = `${outputdir}${outputname}`
    const result = await convertMarkdownFileToJsonFile(filepath, outputpath)
    console.log('Parsed', result.source)
    const relativepath = result.output.slice(root('./').length)
    console.log('  Created', relativepath, result.size, 'bytes')
    console.log('')
    return result
  })

  return Promise.all(work)
}

parseMarkdownFiles()
