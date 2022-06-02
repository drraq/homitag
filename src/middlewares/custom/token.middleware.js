module.exports = (opts) => {
    const {logger, jwt, config, _, encryptor} = opts
    
    const verify = async (req, res, next) => {
        try {
            // Get the token
            const bearerHeader = req.headers['authorization']
            if (!_.isNil(bearerHeader)) {
                const bearer = bearerHeader.split(' ')

                // `Bearer <token>` is expected
                if (bearer.length !== 2) throw new Error(`[Authorization]: Invalid bearer token`)
                
                const tokenBearer = bearer[1]

                let decodeToken = await jwt.decode(tokenBearer)
                let decodeClaims = await encryptor.encryptDecryptPassword(decodeToken.claims, 'decrypt', config)
                decodeClaims = JSON.parse(decodeClaims)

                jwt.verify(tokenBearer, config.get('jwt:secret'), (err, value)=>{
                    if (err) {
                        const {message} = err
                        throw new Error(message)
                    } else {
                        req.claims = decodeClaims
                        logger.info(`Token verification successful`)
                        next()
                    }
                })

            } else {
                const message = `[Authorization]: Token missing`
                throw new Error(message)
            }

        } catch(err) {
            logger.info(`Custom > Middleware > Token >`)
            const {message} = err
            logger.error(`Error: ${message}`)
            
            const ERROR_CODE = 500
            res.json({
                success: false,
                message,
                code: ERROR_CODE
            })
        }
    }

    return {
        verify
    }
}