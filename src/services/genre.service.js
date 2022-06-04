module.exports = (opts) => {

    const {genreModel, logger, db, _} = opts

    // Collection name
    const colName = "genres"

    const index = async (params) => {
        try {
            // Get collection
            const col = db.collection(colName)

            const page = _.toNumber(_.get(params, 'page', 1))
            const pageSize = _.toNumber(_.get(params, 'pageSize', 10))

            const {options} = genreModel.index(params)
            const cursor = col.find({}, options).skip((page - 1) * pageSize).limit(pageSize)
            const count = await cursor.count()
            const genres = await cursor.toArray()

            return {count, genres}

        } catch (err) {
            logger.info(`Service > Genre > Index >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const add = async (params) => {
        try {
            // Get collection
            const col = db.collection(colName)
            const document = genreModel.add(params)
    
            const result = await col.insertOne(document)
            const {insertedId} = result
    
            logger.info(`Genre inserted ID: ${insertedId}`)
    
            return {insertedId}
        } catch (err) {
            logger.info(`Service > Genre > Add >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const remove = async (params) => {
        try {
            const col = db.collection(colName)
            const {query, options} = genreModel.remove(params)
            
            const result = await col.findOneAndDelete(query, options)
            const {value} = result
            const {n} = result['lastErrorObject']

            return {count: n, genre: value}

        } catch (err) {
            logger.info(`Service > Genre > Remove >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const show = async (params) => {
        try {
            const col = db.collection(colName)
            const document = genreModel.show(params)
            
            const result = await col.findOne(document)
            
            return {genre: result}

        } catch (err) {
            logger.info(`Service > Genre > Show >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    return {
        add,
        index,
        remove,
        show
    }
}