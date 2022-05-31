const mongodb = require('./mongodb')
const redis = require('./redis')

module.exports = async (opts) => ({
    cache: await redis(opts),
    db: await mongodb(opts)
})