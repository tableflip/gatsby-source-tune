const Fs = require('fs-extra')

function loadNodeContent (node) {
  return Fs.readFile(node.absolutePath, 'utf-8')
    .then((contents) => JSON.parse(contents))
}

exports.loadNodeContent = loadNodeContent
