module.exports = (opts) => {
    const {logger, movieHandler, validationMiddleware, tokenMiddleware, joi} = opts

    const prefix = "/movie"

    // GET request to retrieve all movies
    const index = (app) => {
        logger.info('Registering Route: Movie > Index >')
        const schema = joi.object().keys({
            page: joi.number().min(1),
            pageSize: joi.number().min(1),
            sortBy: joi.string().valid('name', 'releaseDate', 'genre', 'duration', 'rating', 'createdAt'),
            sortIn: joi.number().valid(1, -1)     // 1 -> Ascending Order -1 -> Descending Order
        }).unknown(false)

        const validSchema = validationMiddleware.validate(schema, 'query')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        const handler = movieHandler.index

        app.get(prefix, callbackArr, handler)

    }

    // POST request to add new movie
    const add = (app) => {
        logger.info('Registering Route: Movie > Add >')
        const path = "/add"

        // Body of the request must contain `name` and `description` fields
        const schema = joi.object().keys({
            name: joi.string().required(),
            description: joi.string().required(),
            genre: joi.array().items(joi.string()).min(1),
            duration: joi.number().min(1).required(),
            rating: joi.number().min(1).max(5).required(),
            releaseDate: joi.date().iso().required()
        })

        const validSchema = validationMiddleware.validate(schema, 'body')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = movieHandler.add

        app.post(prefix + path, callbackArr, handler)

    }

    // DELETE request to remove a movie
    // Genre ID is required in body of the request
    const remove = (app) => {
        logger.info('Registering Route: Movie > Remove >')
        const path = "/delete/:id"

        // Body of the request must contain `id` field
        // id is the mongodb object ID (24 characters hex)
        const schema = joi.object().keys({
            id: joi.string().hex().length(24).required()
        })

        const validSchema = validationMiddleware.validate(schema, 'params')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = movieHandler.remove

        app.delete(prefix + path, callbackArr, handler)

    }

    // GET request to describe movie
    // Genre ID is required in path parameter
    const show = (app) => {
        logger.info('Registering Route: Movie > Show >')
        const path = "/show/:id"

        // Body of the request must contain `id` field
        // id is the mongodb object ID (24 characters hex)
        const schema = joi.object().keys({
            id: joi.string().hex().length(24).required()
        })

        const validSchema = validationMiddleware.validate(schema, 'params')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = movieHandler.show

        app.get(prefix + path, callbackArr, handler)

    }

    return {
        add,
        index,
        remove,
        show
    }
}