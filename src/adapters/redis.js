const IORedis = require('ioredis')

module.exports = async ({ logger, config }) => {
    logger.info(`Initializing Redis Adapter >`)
    
    const host = config.get('cache:redis:host')
    const port = config.get('cache:redis:port')

    const client = new IORedis(port, host)

    client
        .on('ready', () => {
            logger.info('REDIS_EVENT [ready]')
        })
        .on('error', (err) => {
            logger.error(`REDIS_EVENT [error] ${err.message}`)
        })
        .on('end', () => {
            logger.info('REDIS_EVENT [disconnect]')
        })

    return client
}