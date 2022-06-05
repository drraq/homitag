const axios = require('axios')
axios.defaults.baseURL = "http://localhost:3500"

describe('Auth Endpoint testing', () => {

    // Test registration first
    test('Registeration with name, email and password', async () => {
        
        const payload = {name: "John Doe", email: "john.doe@mail.com", password: "JohnDoe123"}

        const response = await axios.post('/auth/register', payload, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.insertedId).toEqual(expect.stringMatching(/[a-f0-9]{24}/))
    })

    // Test Login
    test('Login with email and password', async () => {
        const payload = {email: "john.doe@mail.com", password: "JohnDoe123"}
        const response = await axios.post('/auth/login', payload, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.token).toBeTruthy()
    })
})
