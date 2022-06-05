const axios = require('axios')
axios.defaults.baseURL = "http://localhost:3500"
const {token} = require('./token')
axios.defaults.headers.common['Authorization'] = token

describe('Test Genre Endpoints', () => {
    // Test Index endpoint
    // It should give all the genres in an array
    const genre = {
        _id: expect.stringMatching(/[a-f0-9]{24}/),
        name: expect.any(String)
    }
    test('To list all the genres', async () => {
        const response = await axios.get('/genre', {
            responseType: 'json'
        })
        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.totalCount).toBeGreaterThanOrEqual(0)
        expect(data.data.count).toBeGreaterThanOrEqual(0)
        expect(data.data.genres).toEqual(expect.arrayContaining([
            expect.objectContaining(genre)
        ]))
    })

    test('To add a genre', async () => {
        const payload = {name: "Romantic", description: "Expressing Love and Romance"}
        const response = await axios.post('/genre/add', payload, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.insertedId).toEqual(expect.stringMatching(/[a-f0-9]{24}/))
    })

    /**

    test('To show details of a genre', async () => {
        // Genre object
        const genre = {
            _id: expect.stringMatching(/[a-f0-9]{24}/),
            name: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(Number)
        }

        // The `id` should be present in the database
        const id = "629bb837716df26dadc2271a"
        const response = await axios.get('/genre/show/' + id, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data).toMatchObject(genre)
    }) 

    test('To delete a genre', async () => {
        // Replace some valid `id` from the database
        const id = "629bb829716df26dadc22719"

        const genre = {
            _id: expect.stringMatching(/[a-f0-9]{24}/),
            name: expect.any(String)
        }
        const response = await axios.delete('/genre/delete/' + id, {
            responseType: 'json'
        })
        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.count).toBeGreaterThanOrEqual(0)
        expect(data.data.genre).toMatchObject(genre)
    })

    */
})