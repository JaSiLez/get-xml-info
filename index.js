const core = require('@actions/core')
const fs = require('fs')

try {
  console.log('Welcome to Get-XML-Version.')

  const argv = require('minimist')(process.argv.slice(2))
  const xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE + '/' + core.getInput('xml-file', { required: true })
  const xpathToSearch = (typeof argv.p !== 'undefined') ? argv.p : core.getInput('xpath', { required: true })
  const debug = typeof argv.d !== 'undefined'

  console.log(`File to read: ${xmlFile}`)
  console.log(`XPath: ${xpathToSearch}`)

  const xpath = require('xpath')
  const Dom = require('xmldom').DOMParser

  fs.readFile(xmlFile, 'utf8', function read (err, data) {
    if (err) {
      core.setFailed(err.message)
    } else {
      console.log('File was read successfully. Proceeding to parse DOM.')

      const doc = new Dom().parseFromString(data)
      if (debug) {
        console.log('Debug output: Document.')
        console.log(doc)
      }

      const nodes = xpath.select(xpathToSearch, doc)
      if (debug) {
        console.log('Debug output: Nodes.')
        console.log(nodes)
      }

      console.log(`Found ${nodes.length} nodes.`)

      if (nodes.length) {
        const output = []
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          const firstChild = node.firstChild
          if (firstChild) {
            output.push(firstChild.data)
          } else {
            output.push(node.value)
          }
        }
        core.setOutput('info', output)
        console.log(`Output: ${output}`)
      } else {
        core.setFailed('Your xpath did not return any nodes.')
      }
    }
  })
} catch (error) {
  core.setFailed(error.message)
}
