module.exports = (opts) => {

    const {logger, movieService, _} = opts

    const index = async (req, res) => {
        logger.info(`Handler > Movie > Index >`)
        logger.info(`Get request received`)

        const query = req.query
        const {error, totalCount, count, movies} = await movieService.index(query)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    totalCount,
                    count,
                    movies
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
        logger.info(`Handler > Movie > Add >`)
        logger.info(`Post request received`)

        const params = req.body
        const {error, insertedId} = await movieService.add(params)

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
        logger.info(`Handler > Movie > Remove >`)
        logger.info(`Delete request received`)

        const params = req.params
        const {error, count, movie} = await movieService.remove(params)

        if (_.isNil(error)) {
            logger.warn(`[${count}] documents deleted`)
            res.json({
                success: true,
                data: {
                    count,
                    movie
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
        logger.info(`Handler > Movie > Show >`)
        logger.info(`Get request received`)

        const params = req.params
        const {error, movie} = await movieService.show(params)

        if (_.isNil(error)) {
            res.json({
                success: true,
                data: {
                    ...movie
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