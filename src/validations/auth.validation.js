module.exports = (opts) => {

    const {logger} = opts

    const createUser = (schema) => (req, res, next) => {
        
        const {body} = req
        const {error} = schema.validate(body)

        if (error) {
            const {message} = error.details[0]

            const BAD_REQUEST = 400
            res.status(BAD_REQUEST).json({
                ok: false,
                message,
                code: BAD_REQUEST
            })
        } else next()
    }

    return {
        createUser
    }

}