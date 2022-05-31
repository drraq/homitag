const path = require('path')
const nconf = require('nconf')

/**
 * First nconf will load environment variables from process.env
 * Second argument vector from process.argv
 * Finally it will load configuration from the JSON file
 */
nconf.env().argv()

const env = nconf.get('environment')

const file = path.resolve('src', 'env', `${env}.json`)

console.log("Loading Config File >", file)

nconf.file({ file })

module.exports = nconf