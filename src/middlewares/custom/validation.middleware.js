module.exports = (opts) => {

    const {logger} = opts

    const validate = (schema, type) => (req, res, next) => {
        
        const toBeValidated = req[type]
        const {error} = schema.validate(toBeValidated)

        if (error) {
            const {message} = error.details[0]

            logger.error(`Validation Error: ${message}`)
            const BAD_REQUEST = 400
            res.json({
                success: false,
                message,
                code: BAD_REQUEST
            })
        } else next()
    }

    return {
        validate
    }

}