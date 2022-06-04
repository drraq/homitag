module.exports = async (app, container) => {

    const di = container.cradle
    const {_, logger} = di

    const injections = Object.keys(di)
    const schemas = injections.filter(x => x.indexOf('Schema') !== -1)

    // Loop through all Schemas and register routes
    _.map(schemas, s => {
        const routes = Object.keys(di[s])
        _.map(routes, route => {
            di[s][route](app)
        })
    })

    // Register default route
    // This has to come after all other routes are registered
    logger.info('Registering Default Route: RouteNotFound >')
    app.use((req, res) => {
        res.json({
            success: false,
            data: {
                message: "[404] Route not found"
            }
        })
    })
}