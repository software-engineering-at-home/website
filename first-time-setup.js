const path = require('path')
const { read, write, position, run } = require('promise-path')

const fromHere = position(__dirname)
const packageJson = require('./package.json')
async function report (...messages) { console.log(`[${packageJson.name} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages) }

async function replaceInFile (filename, search, replace) {
  const haystack = await read(filename, 'utf8')
  const ashes = haystack.replaceAll(search, replace)
  return write(filename, ashes, 'utf8')
}

async function findRemote (dirpath) {
  const { stdout, stderr } = await run('git config --get remote.origin.url', dirpath)
  if (stderr) {
    report('Unable to identify remote:', stderr)
  }
  const remote = stdout || ''

  const gitAtGithubMatcher = /git@github\.com:([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\.git/
  const httpsGithubMatcher = /https:\/\/github.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\.git/

  report('Find remote:', remote)
  const [, org, repo] = remote.match(gitAtGithubMatcher) || remote.match(httpsGithubMatcher)
  return {
    remote,
    org,
    repo
  }
}

async function setup () {
  const currentPath = fromHere('/')
  const currentFolder = currentPath.split('/').reverse()[1]
  const currentRemote = await findRemote(currentPath)

  report('Setting up template from:', currentFolder)
  report('Current remote:', currentRemote)
  const { org, repo } = currentRemote

  report('Replacing strings in templates')
  await replaceInFile('package.json', 'connected-web/vuesite-template', `${org}/${repo}`)
  await replaceInFile('package.json', 'vuesite-template', `${repo}`)
  await replaceInFile('README.md', 'Vuesite Template', 'Your new Vuesite!')
  await replaceInFile('README.md', 'https://connected-web.github.io/vuesite-template/', `https://${org}.github.io/${repo}/`)
  await replaceInFile('README.md', 'connected-web/vuesite-template', `${org}/${repo}`)

  report('Remove and generate package-lock.json')
  await run(`rm ${fromHere('package-lock.json')}`, currentPath)
  await run('npm install', currentPath)

  report('Generated updated screenshot')
  await run('node generate-screenshot.js', currentPath)

  report('Removing setup script')
  await run(`rm ${fromHere('first-time-setup.js')}`, currentPath)

  report('Committing changes and pushing to remote')
  await run('git add .')
  await run(`git commit -m "Setup new vuesite from template for ${org}/${repo})"`)
  await run('git push')

  report(`All done - ${org}/${repo} has been setup and is ready to go!`)
}

setup()
