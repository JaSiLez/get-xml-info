
const fs = require('fs')
const xpath = require('xpath')
const Dom = require('xmldom').DOMParser

function xmlInfo (xmlFile, xpathToSearch, debug = false) {
  console.log(`File to read: ${xmlFile}`)
  console.log(`XPath: ${xpathToSearch}`)

  const data = fs.readFileSync(xmlFile, 'utf8')
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
    return output
  } else {
    throw new Error('Your xpath did not return any nodes.')
  }
}

module.exports = xmlInfo
