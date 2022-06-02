module.exports = (opts) => {

    const {logger, authHandler, validationMiddleware, joi, tokenMiddleware} = opts

    const prefix = "/auth"
    
    const register = (app) => {
        logger.info('Registering Route: Auth > Register >')

        const path = "/register"

        const schema = joi.object().keys({
            name: joi.string().required(),
            email: joi.string().required().email(),
            password: joi.string().required().custom(password),
        })

        const validSchema = validationMiddleware.validate(schema, 'body')

        const callbackArr = [validSchema]
        const handler = authHandler.register

        app.post(prefix + path, callbackArr, handler)
    }

    const login = (app) => {
        logger.info('Registering Route: Auth > Login >')
        const path = "/login"

        const schema = joi.object().keys({
            email: joi.string().required(),
            password: joi.string().required(),
        })

        const validSchema = validationMiddleware.validate(schema, 'body')
        const callbackArr = [validSchema]
        const handler = authHandler.login

        app.post(prefix + path, callbackArr, handler)
    }

    const test = (app) => {
        const callbackArr = [tokenMiddleware.verify]

        app.get(prefix + "/test", callbackArr, (req, res) => {
            res.json({
                success: true,
                data: {
                    claims: req.claims
                }
            })
        })
    }

    return {
        register,
        login,
        test
    }
}

// Custom password validation
function password (value, helpers) {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters')
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('password must contain at least 1 letter and 1 number')
    }
    return value
}