module.exports = async (app, container) => {

    const di = container.cradle
    const {_} = di

    const injections = Object.keys(di)
    const schemas = injections.filter(x => x.indexOf('Schema') !== -1)

    // Loop through all Schemas and register routes
    _.map(schemas, s => {
        const routes = Object.keys(di[s])
        _.map(routes, route => {
            di[s][route](app)
        })
    })
}