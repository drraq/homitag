module.exports = (opts) => {
    const {logger, genreHandler, validationMiddleware, tokenMiddleware, joi} = opts

    const prefix = "/genre"

    // GET request to retrieve all genres
    const index = (app) => {
        logger.info('Registering Route: Genres > Index >')

        const schema = joi.object().keys({
            page: joi.number().min(1),
            pageSize: joi.number().min(1),
            sortBy: joi.string().valid('name', 'createdAt'),
            sortIn: joi.number().valid(1, -1)     // 1 -> Ascending Order -1 -> Descending Order
        }).unknown(false)

        const validSchema = validationMiddleware.validate(schema, 'query')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        const handler = genreHandler.index

        app.get(prefix, callbackArr, handler)
    }

    // POST request to add new genre
    const add = (app) => {
        logger.info('Registering Route: Genres > Add >')
        const path = "/add"

        // Body of the request must contain `name` and `description` fields
        const schema = joi.object().keys({
            name: joi.string().required(),
            description: joi.string().required()
        })

        const validSchema = validationMiddleware.validate(schema, 'body')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = genreHandler.add

        app.post(prefix + path, callbackArr, handler)
    }

    // DELETE request to remove a genre
    // Genre ID is required in body of the request
    const remove = (app) => {
        logger.info('Registering Route: Genres > Remove >')
        const path = "/delete"

        // Body of the request must contain `id` field
        // id is the mongodb object ID (24 characters hex)
        const schema = joi.object().keys({
            id: joi.string().hex().length(24).required()
        })

        const validSchema = validationMiddleware.validate(schema, 'body')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = genreHandler.remove

        app.delete(prefix + path, callbackArr, handler)

    }

    // GET request to describe genre
    // Genre ID is required in path parameter
    const show = (app) => {
        logger.info('Registering Route: Genres > Show >')
        const path = "/show/:id"

        // Body of the request must contain `id` field
        // id is the mongodb object ID (24 characters hex)
        const schema = joi.object().keys({
            id: joi.string().hex().length(24).required()
        })

        const validSchema = validationMiddleware.validate(schema, 'params')
        const callbackArr = [tokenMiddleware.verify, validSchema]

        // Request-Response cycle ends here
        const handler = genreHandler.show

        app.get(prefix + path, callbackArr, handler)

    }

    return {
        add,
        index,
        remove,
        show
    }
}