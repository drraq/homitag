module.exports = (opts) => {

    const {logger, authService} = opts

    const createUser = async (req, res) => {
        logger.info(`Post request received`)
        logger.info(`Handler > Auth > Create User`)
        
        const params = req.body
        const {error, insertedId} = await authService.createUser(params)

        if (error) {
            res.status(500).json({
                success: false,
                data: {
                    message: error
                }
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    insertedId
                }
            })
        }
    }

    return {
        createUser
    }
}