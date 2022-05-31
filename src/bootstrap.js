const ExpressServer = require('./globals/server')

module.exports = async () => {
    try {
        const app = await ExpressServer()
        await app.start()

    } catch(err) {
        console.error("Fatal Error In Bootstrap > ", err)
        process.exit(1)
    }
    
}