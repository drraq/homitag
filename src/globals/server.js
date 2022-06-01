const express = require('express')

const config = require('./config')
const logger = require('./logger')
const di = require('./di')
const adapters = require('../adapters')
const defaultMiddlewares = require('../middlewares/default.middleware')
const registerRoutes = require('../routes')

module.exports = async function ExpressServer() {
    const server = express()

    const defaultInitialization = async () => {
        const awilix = await di({logger, config})
        const container = await awilix.getContainer()
        const _adapters = await adapters(container.cradle)
        awilix.register('cache', _adapters.cache)
        awilix.register('db', _adapters.db)

        // Register Routes
        // Keep it in default initialization since it depends on container cradle
        await registerRoutes(server, container)
    }

    const start = async () => {
        try {
            // Default middlewares would come first then default initialization
            await defaultMiddlewares({app: server, logger})

            await defaultInitialization()

            const port = config.get('server:port')

            server.listen(port, () => {
                logger.info(`[\u2713] Server started`)
                logger.info(`Listening on port: ${port}`)
            })
        } catch(err) {
            logger.error("Shutting Down Due To Fatal Exception >")
            logger.error("Server Initialization Error >", err)
            process.exit(1)
        }
    }

    return {
        start,
        server
    }
}