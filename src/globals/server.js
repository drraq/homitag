const express = require('express')

const config = require('./config')
const logger = require('./logger')
const di = require('./di')
const adapters = require('../adapters')
const defaultMiddlewares = require('../middlewares/default.middleware')

module.exports = async function ExpressServer() {
    const server = express()

    const defaultInitialization = async () => {
        const awilix = await di({logger, config})
        const container = await awilix.getContainer()
        const _adapters = await adapters(container.cradle)
        container.register('cache', _adapters.cache)
        container.register('db', _adapters.db)
    }

    const start = async () => {
        try {
            await defaultInitialization()
            await defaultMiddlewares({app: server, logger})

            const port = config.get('server:port')

            server.listen(port, () => {
                logger.info(`[\u2713] Server started`)
                logger.info(`Listening to port ${port}`)
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