module.exports = () => {

    const register = ({name, email, password}) => ({
        name,
        email,
        password
    })

    const login = ({email, password}) => {
        const query = {
            email,
            password
        }

        const options = {
            projection: {
                email: 1
            }
        }

        return {query, options}
    }

    return {
        register,
        login
    }
}