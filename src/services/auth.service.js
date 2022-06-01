module.exports = (opts) => {
    const {encryptor, authModel, logger, db, config, _} = opts

    // Collection name
    const colName = 'users'

    const createUser = async (params) => {

        try {
            const _params = {...params}

            // Encrypt password
            const password = await encryptor.encryptDecryptPassword(_params.password, "encrypt", config)

            // Update password field - encryption ready
            _.set(_params, 'password', password)

            // Get collection
            const col = db.collection(colName)
            const document = authModel.createUser(_params)

            const result = await col.insertOne(document)
            const {insertedId} = result

            logger.info(`User inserted ID: ${insertedId}`)

            return {insertedId}

        } catch (err) {
            logger.info(`Service > Auth > Create User >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }

    }

    return {
        createUser
    }
}