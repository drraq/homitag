const Cluster = require('cluster')
const Bootstrap = require('./src/bootstrap')
const numCPUs = require('os').cpus().length

// To use all available cores
if (Cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
  
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        Cluster.fork()
    }

    Cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`)
    })
  } else {
    init()
    console.log(`Worker ${process.pid} started`)
  }

// To use one core
// init()

async function init() {
  try {
      await Bootstrap()
  } catch (err) {
      console.error("Fatal Error During Application Bootstrap >", err)
      process.exit(1)
  }
}