module.exports = (opts) => {

    const {logger, authHandler, authValidation, joi} = opts

    const prefix = "/auth"
    
    const register = (app) => {
        logger.info('Registering Route: auth > register ')

        const path = "/register"

        const schema = joi.object().keys({
            name: joi.string().required(),
            email: joi.string().required().email(),
            password: joi.string().required().custom(password),
        })

        const validSchema = authValidation.createUser(schema)

        const callbackArr = [validSchema]
        const handler = authHandler.createUser

        app.post(prefix + path, callbackArr, handler)

    }

    return {
        register
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