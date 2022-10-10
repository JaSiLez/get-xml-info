const core = require('@actions/core')
const xmlInfo = require('./xmlInfo')

// Set inputs
const argv = require('minimist')(process.argv.slice(2))
const xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE + '/' + core.getInput('xml-file', { required: true })
const xpathToSearch = (typeof argv.p !== 'undefined') ? argv.p : core.getInput('xpath', { required: true })
const debug = typeof argv.d !== 'undefined'

try {
  console.log('Welcome to Get-XML-Version.')

  const output = xmlInfo(xmlFile, xpathToSearch, debug)
  console.log(`Output: ${output}`)
  core.setOutput('info', output)
} catch (error) {
  core.setFailed(error.message)
}
