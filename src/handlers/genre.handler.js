module.exports = (opts) => {

    const {logger, genreService, _} = opts

    const index = async (req, res) => {
        logger.info(`Handler > Genre > Index >`)
        logger.info(`Get request received`)

        const query = req.query
        const {error, count, genres} = await genreService.index(query)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    count,
                    genres
                }
            })
        } else {
            res.json({
                success: false,
                data: {
                    message: error
                }
            })
        }

    }

    const add = async (req, res) => {
        logger.info(`Handler > Genre > Add >`)
        logger.info(`Post request received`)

        const params = req.body
        const {error, insertedId} = await genreService.add(params)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    insertedId
                }
            })
        } else {
            res.json({
                success: false,
                data: {
                    message: error
                }
            })
        }
    }

    const remove = async (req, res) => {
        logger.info(`Handler > Genre > Remove >`)
        logger.info(`Delete request received`)

        const params = req.body
        const {error, count, genre} = await genreService.remove(params)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    count,
                    genre
                }
            })
        } else {
            res.json({
                success: false,
                data: {
                    message: error
                }
            })
        }
    }

    const show = async (req, res) => {
        logger.info(`Handler > Genre > Show >`)
        logger.info(`Get request received`)

        const params = req.params
        const {error, genre} = await genreService.show(params)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    ...genre
                }
            })
        } else {
            res.json({
                success: false,
                data: {
                    message: error
                }
            })
        }
    }

    return {
        add,
        index,
        remove,
        show
    }
}