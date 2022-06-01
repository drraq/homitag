module.exports = () => {

    const createUser = ({name, email, password}) => ({
        name,
        email,
        password
    })

    return {
        createUser
    }
}