const slash = require('slash')
const Path = require('path')
const Crypto = require('crypto')
const Fs = require('fs-extra')
const _ = require('lodash')

const createId = (path) => {
  const slashed = slash(path)
  return `${slashed} absPath of file`
}

exports.createId = createId

exports.createTuneNode = async (pathToFile, pluginOptions = {}) => {
  const rootPath = pluginOptions.path || process.cwd()
  const slashed = slash(pathToFile)
  const parsedSlashed = Path.parse(slashed)

  let type

  if (parsedSlashed.base === 'facts.json') {
    type = 'Facts'
  } else if (parsedSlashed.base === 'schema.json') {
    if (parsedSlashed.dir === rootPath) {
      type = 'FactsSchema'
    } else {
      type = _.upperFirst(_.camelCase(`${Path.basename(parsedSlashed.dir)} Schema`))
    }
  } else if (parsedSlashed.base === 'content.json') {
    type = _.upperFirst(_.camelCase(`${Path.basename(parsedSlashed.dir)} Content`))
  }

  const content = await Fs.readFile(slashed, 'utf-8')
  const parsedContent = JSON.parse(content)

  return {
    id: createId(pathToFile),
    children: [],
    parent: null,
    internal: {
      type,
      contentDigest: createContentDigest(content)
    },
    sourceInstanceName: pluginOptions.name || '__TUNE__',
    absolutePath: slashed,
    // Useful for limiting graphql query with certain parent directory
    relativeDirectory: Path.relative(rootPath, parsedSlashed.dir),
    ...parsedContent
  }
}

function createContentDigest (buf) {
  return Crypto.createHash('md5').update(buf).digest('hex')
}
