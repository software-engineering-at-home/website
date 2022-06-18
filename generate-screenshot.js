const path = require('path')
const { run } = require('promise-path')
const { spawn } = require('child_process')

const packageJson = require('./package.json')
const { clearInterval } = require('timers')
async function report (...messages) { console.log(`[${packageJson.name} / ${__filename.split(path.sep).pop().split('.js').shift()}]`, ...messages) }

function startServer () {
  const serverStartCommand = 'npm start'
  const spawnArgs = serverStartCommand.split(' ')
  const [first, ...rest] = spawnArgs
  const refProcess = spawn(first, rest)
  const processState = {
    refProcess,
    stderr: [],
    stdout: [],
    messages: [],
    exitCode: 'unknown',
    timeout: false
  }

  refProcess.stdout.on('data', (data) => {
    processState.stdout.push(data + '')
    processState.messages.push(data + '')
  })

  refProcess.stderr.on('data', (data) => {
    processState.stderr.push(data + '')
    processState.messages.push(data + '')
  })

  refProcess.on('close', (code) => {
    processState.exitCode = code
    if (processState.timeout) {
      clearTimeout(processState.timeout)
    }
  })

  return processState
}

async function takeScreenshot (url) {
  const screenshotFile = 'screenshot.png'
  report('Taking screenshot!')
  const screenshotCommand = `npx capture-website ${url} --output ${screenshotFile} --width 800 --height 600 --delay 1 --overwrite`
  report(`Running: ${screenshotCommand}`)
  const { stdout, stderr } = await run(screenshotCommand)
  if (!stderr) {
    stdout || report(stdout)
    report('Created screenshot:', screenshotFile, 'from', url)
  } else {
    report(stderr)
  }
}

async function generateScreenshot () {
  report('Starting local screenshot server')

  let triggerFound = false
  const processState = startServer()
  const processInfoCleardown = setInterval(() => {
    const { stdout, stderr, messages } = processState
    while (stdout.length) {
      const line = stdout.shift()
      if (line.match('http://localhost') && !triggerFound) {
        triggerFound = true
        const [, url] = line.match(/(http:\/\/localhost:[\d]+\/)/)
        setTimeout(async () => {
          report('Matched URL in server start output:', url)
          await takeScreenshot(url)
          clearInterval(processInfoCleardown)
          processState.refProcess.kill()
        }, 0)
      }
      console.log(line)
    }
    while (stderr.length) {
      console.error(stderr.shift())
    }
    while (messages.length) {
      console.info(messages.shift())
    }
  }, 500)
}

generateScreenshot()
