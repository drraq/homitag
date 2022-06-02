module.exports = (opts) => {
    const {encryptor, authModel, logger, db, config, _} = opts

    // Collection name
    const colName = 'users'

    const register = async (params) => {

        try {
            const _params = {...params}

            // Encrypt password
            const password = await encryptor.encryptDecryptPassword(_params.password, "encrypt", config)

            // Update password field - encryption ready
            _.set(_params, 'password', password)

            // Get collection
            const col = db.collection(colName)
            const document = authModel.register(_params)

            const result = await col.insertOne(document)
            const {insertedId} = result

            logger.info(`User inserted ID: ${insertedId}`)

            return {insertedId}

        } catch (err) {
            logger.info(`Service > Auth > Register >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const login = async (params) => {

        try {
            const _params = {...params}

            // Encrypt password
            const password = await encryptor.encryptDecryptPassword(_params.password, "encrypt", config)

            // Update password field - encryption ready
            _.set(_params, 'password', password)

            const col = db.collection(colName)
            const {query, options} = authModel.login(_params)

            const user = await col.findOne(query, options)

            logger.info(`User Object: ${JSON.stringify(user, null, 2)}`)
            return {user}

        } catch (err) {
            logger.info(`Service > Auth > Login >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    return {
        register,
        login
    }
}