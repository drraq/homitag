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
                message: "[404] Route not found",
                help: {
                    flow: {
                        step1: "Register a user using /auth/register API",
                        step2: "Acquire JSON Web Token (JWT) using /auth/login API",
                        step3: "Send 'JWT token' along every request for Genre and Movie"
                    },
                    api: {
                        auth:[
                            {
                                description: "To register a user",
                                method: 'POST',
                                endpoint: "/auth/register",
                                body: {
                                    name: "<string>",
                                    email: "<string>",
                                    password: "<string>"
                                }
                            },
                            {
                                description: "To login a user",
                                method: 'POST',
                                endpoint: "/auth/login",
                                body: {
                                    email: "<string>",
                                    password: "<string>"
                                }
                            }],
                        genres:[
                            {
                                description: "To list all genres",
                                method: "GET",
                                endpoint: "/genres",
                                query: {
                                    page: "<integer>",
                                    pageSize: "<integer>",
                                    sortBy: "<string>",
                                    sortIn: "(1 | -1 )"
                                }
                            },
                            {
                                description: "To add a genre",
                                method: "POST",
                                endpoint: "/genres/add",
                                body: {
                                    name: "<string>",
                                    description: "<string>"
                                }
                            },
                            {
                                description: "To delete a genre",
                                method: "DELETE",
                                endpoint: "/genres/delete/:id",
                                path: {
                                    id: "<string[24]>"
                                }
                            },
                            {
                                description: "To show details of a genre",
                                method: "GET",
                                endpoint: "/genres/show/:id",
                                path: {
                                    id: "<string[24]>"
                                }
                            }
                        ],
                        movies:[
                            {
                                description: "To list all movies",
                                method: "GET",
                                endpoint: "/movies",
                                query: {
                                    page: "<integer>",
                                    pageSize: "<integer>",
                                    sortBy: "<string>",
                                    sortIn: "(1 | -1 )"
                                }
                            },
                            {
                                description: "To add a movie",
                                method: "POST",
                                endpoint: "/movies/add",
                                body: {
                                    name: "<string>",
                                    description: "<string>",
                                    genre: "<string>",
                                    duration: "<integer[minutes]>",
                                    rating: "<integer>",
                                    releaseDate: "<ISO Date>",
                                }
                            },
                            {
                                description: "To delete a movie",
                                method: "DELETE",
                                endpoint: "/movies/delete/:id",
                                path: {
                                    id: "<string[24]>"
                                }
                            },
                            {
                                description: "To show details of a movie",
                                method: "GET",
                                endpoint: "/movies/show/:id",
                                path: {
                                    id: "<string[24]>"
                                }
                            }
                        ]
                    }
                }
            }
        })
    })
}