module.exports = (opts) => {

    const {movieModel, logger, db, _} = opts

    // Collection name
    const colName = "movies"

    const index = async (params) => {
        try {
            // Get collection
            const col = db.collection(colName)

            const page = _.toNumber(_.get(params, 'page', 1))
            const pageSize = _.toNumber(_.get(params, 'pageSize', 10))

            const {options} = movieModel.index(params)
            const cursor = col.find({}, options).skip((page - 1) * pageSize).limit(pageSize)
            const totalCount = await col.estimatedDocumentCount()
            const movies = await cursor.toArray()

            return {totalCount, count: movies.length, movies}

        } catch (err) {
            logger.info(`Service > Movie > Index >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const add = async (params) => {
        try {
            // Get collection
            const col = db.collection(colName)
            const document = movieModel.add(params)
    
            const result = await col.insertOne(document)
            const {insertedId} = result
    
            logger.info(`Genre inserted ID: ${insertedId}`)
    
            return {insertedId}
        } catch (err) {
            logger.info(`Service > Movie > Add >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const remove = async (params) => {
        try {
            const col = db.collection(colName)
            const {query, options} = movieModel.remove(params)
            
            const result = await col.findOneAndDelete(query, options)
            const {value} = result
            const {n} = result['lastErrorObject']

            return {count: n, movie: value ?? {}}

        } catch (err) {
            logger.info(`Service > Movie > Remove >`)

            const {message} = err
            logger.error(`Error: ${message}`)
            return {error: message}
        }
    }

    const show = async (params) => {
        try {
            const col = db.collection(colName)
            const document = movieModel.show(params)
            
            const result = await col.findOne(document)
            
            return {movie: result}

        } catch (err) {
            logger.info(`Service > Movie > Show >`)

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