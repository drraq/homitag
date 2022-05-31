const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')

/**
 * Register every third party middleware
 * @param {Object} app Express instance
 */
module.exports = async ({app, logger}) => {

    // set security HTTP headers
    app.use(helmet())

    app.use(morgan('combined', { stream: logger.stream }))

    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))

    // enable cors
    app.use(cors())
    app.options('*', cors())

    // gzip compression
    app.use(compression())
}