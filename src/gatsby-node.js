const chokidar = require('chokidar')
const { createId, createTuneNode } = require('./create-tune-node')

exports.sourceNodes = (
  { boundActionCreators, getNode, hasNodeChanged, reporter },
  pluginOptions
) => {
  const { createNode, deleteNode } = boundActionCreators

  let ready = false

  const rootPath = pluginOptions.path || process.cwd()
  const watchPaths = [
    `${rootPath}/facts.json`,
    `${rootPath}/schema.json`,
    `${rootPath}/pages/**/content.json`,
    `${rootPath}/pages/**/schema.json`
  ]

  const watcher = chokidar.watch(watchPaths)

  const createAndProcessNode = (path) => (
    createTuneNode(path, pluginOptions).then(createNode)
  )

  // For every path that is reported before the 'ready' event, we throw them
  // into a queue and then flush the queue when 'ready' event arrives.
  // After 'ready', we handle the 'add' event without putting it into a queue.
  let pathQueue = []
  const flushPathQueue = () => {
    let queue = Array.from(pathQueue)
    pathQueue = []
    return Promise.all(queue.map(createAndProcessNode))
  }

  watcher.on('add', (path) => {
    if (!ready) return pathQueue.push(path)
    reporter.info(`added file at ${path}`)
    createAndProcessNode(path).catch((err) => reporter.error(err))
  })

  watcher.on('change', (path) => {
    reporter.info(`changed file at ${path}`)
    createAndProcessNode(path).catch((err) => reporter.error(err))
  })

  watcher.on('unlink', (path) => {
    reporter.info(`file deleted at ${path}`)
    const node = getNode(createId(path))
    deleteNode(node.id, node)

    // Also delete nodes for the file's transformed children nodes.
    node.children.forEach((childId) => (
      deleteNode(childId, getNode(childId))
    ))
  })

  watcher.on('addDir', (path) => {
    if (!ready) return pathQueue.push(path)
    reporter.info(`added directory at ${path}`)
    createAndProcessNode(path).catch((err) => reporter.error(err))
  })

  watcher.on('unlinkDir', (path) => {
    reporter.info(`directory deleted at ${path}`)
    const node = getNode(createId(path))
    deleteNode(node.id, node)
  })

  return new Promise((resolve, reject) => {
    watcher.on('ready', () => {
      if (ready) return
      ready = true
      flushPathQueue().then(resolve, reject)
    })
  })
}
