const axios = require('axios')
axios.defaults.baseURL = "http://localhost:3500"
const {token} = require('./token')
axios.defaults.headers.common['Authorization'] = token

describe('Test Movie Endpoints', () => {
    // Test Index endpoint
    // It should give all the movies in an array
    const movie = {
        _id: expect.stringMatching(/[a-f0-9]{24}/),
        name: expect.any(String),
        genre: expect.arrayContaining([expect.any(String)]),
        duration: expect.any(Number),
        rating: expect.any(Number),
        releaseDate: expect.any(String)
    }
    test('To list all the movies', async () => {
        const response = await axios.get('/movie', {
            responseType: 'json'
        })
        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.totalCount).toBeGreaterThanOrEqual(0)
        expect(data.data.count).toBeGreaterThanOrEqual(0)
        expect(data.data.movies).toEqual(expect.arrayContaining([
            expect.objectContaining(movie)
        ]))
    })

    test('To add a movie', async () => {
        const payload = {
            name: "Inception",
            description: "Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb's criminal history as payment for performing an inception on his sick competitor's son",
            genre: ['Action', 'Adventure', 'Sci-Fi'],
            rating: 4.5,
            duration: 148,
            releaseDate: "2010-09-11T00:00:00.000Z"

        }
        const response = await axios.post('/movie/add', payload, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data.insertedId).toEqual(expect.stringMatching(/[a-f0-9]{24}/))
    })
    
    /**

    test('To show details of a movie', async () => {
        // Movie object
        const movie = {
            _id: expect.stringMatching(/[a-f0-9]{24}/),
            name: expect.any(String),
            genre: expect.arrayContaining([expect.any(String)]),
            duration: expect.any(Number),
            rating: expect.any(Number),
            description: expect.any(String),
            createdAt: expect.any(Number)
        }

        // The `id` should be present in the database
        const id = "629cc7a3ed006f4f2f429b0c"
        const response = await axios.get('/movie/show/' + id, {
            responseType: 'json'
        })

        const {data} = response
        expect(data.success).toBe(true)
        expect(data.data).toMatchObject(movie)
    })

    test('To delete a genre', async () => {
        // Replace some valid `id` from the database
        const id = "629cc7b29c8c6490a69772d9"

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