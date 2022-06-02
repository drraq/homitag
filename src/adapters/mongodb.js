const {MongoClient} = require('mongodb')
const bluebird = require('bluebird')


module.exports = async ({ logger, config }) => {

    logger.info(`Initializing MongoDB Adapter >`)

    const {dbName, protocol, username, password, host, port} = config.get('database:mongodb')

    let uri = `${protocol}://`

    if (username && password) uri += `${username}:${password}@`

    uri += `${host}:${port}`

    const options = {
        logger,
        loggerLevel: 'info',
        promiseLibrary: bluebird
    }

    const client = new MongoClient(uri, options)

    let db
    try {
        await client.connect()
        db = client.db(dbName)

        // Ping to the Mongo Server
        const ping = await db.command({ ping: 1 })
        logger.info(`Response of Ping >`)
        logger.info(`${JSON.stringify(ping, null, 2)}`)

        const dbStats = await db.command({
            dbStats: 1,
        })

        logger.info('[\u2713] MongoDB ready')
    } catch (err) {
        logger.error(`Fatal Error During MongoDB Startup:, ${err.message}`)
        process.exit(1)
    } finally {
        process.on('SIGINT', async () => {
            logger.warn('SIGINT (Ctrl+C) signal received')
            await client.close()
            process.exit(1)
        })
    }

    return db
}