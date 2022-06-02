const path = require('path')
const awilix = require('awilix')
const joi = require('joi')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const encryptor = require('../helpers/encryptor')

const container = awilix.createContainer()

module.exports = async (options = {}) => {
    // Logger and Config would come from `globals/server.js`
    const logger = _.get(options, 'logger')
    const config = _.get(options, 'config')

    if (logger === undefined) throw new Error('[winston]: logger not found')
    if (config === undefined) throw new Error('[nconf]: config not found')

    container.register({
        config: awilix.asValue(config),
        logger: awilix.asValue(logger),
        joi: awilix.asValue(joi),
        _: awilix.asValue(_),
        jwt : awilix.asValue(jwt),
        encryptor: awilix.asFunction(encryptor)
    })

    container.loadModules(
        [
            'handlers/**/*.js',
            'middlewares/custom/**/*.js',
            'models/**/*.js',
            'schemas/**/*.js',
            'services/**/*.js',
        ],
        {
            cwd: path.resolve('src'),
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix.Lifetime.SINGLETON,
                register: awilix.asFunction
            }
        }
    )

    const getContainer = async () => container

    const register = (type, value) => {
        switch (type) {
            case 'db':
                container.register('db', awilix.asFunction(() => value).singleton())
                break
            case 'cache':
                container.register('cache', awilix.asFunction(() => value).singleton())
                break
        }
    }

    return {
        getContainer,
        register
    }

}