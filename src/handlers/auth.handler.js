module.exports = (opts) => {

    const {_, logger, authService, encryptor, config, jwt} = opts

    const register = async (req, res) => {
        logger.info(`Handler > Auth > Register >`)
        logger.info(`Post request received`)
        
        const params = req.body
        const {error, insertedId} = await authService.register(params)

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

    const login = async (req, res) => {
        logger.info(`Handler > Auth > Login`)
        logger.info(`Post request received`)

        const params = req.body
        const {error, user} = await authService.login(params)
        
        if (_.isNil(error)) {
            if (_.isNil(user)) {
                res.json({
                    success: false,
                    data: {
                        message: `User not found`
                    }
                })
            } else {
                const {_id} = user
                const claims = await encryptor.encryptDecryptPassword(JSON.stringify(user), "encrypt", config)
                const {secret, expiresIn} = config.get('jwt')
                
                const token = jwt.sign({claims}, secret, {expiresIn})
                res.json({
                    success: true,
                    data: {
                        token,
                        userId: _id
                    }
                })
            }
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
        register,
        login
    }
}