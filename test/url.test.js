const request = require('supertest');
const { Urls } = require('../models/url');
let server;

const execPost = async (urlObj) => {
    return await request(server)
        .post('/api/url')
        .send(urlObj)
} 
describe('/api/urls', () => {

    beforeEach(() => {  server = require('../app'); })
    afterEach( async () => { 
        server.close(); 
        await Urls.remove({})
    })

    describe('POST /', () => {

        it('Should return an Error with status code 400 if Url is not valid', async () => {
            const res = await execPost({longUrl : 'falseUrl'})    
            expect(res.status).toBe(400)
        })

        it('Should return an Error with Status code 400 is the body of the request is incorrect', async () => {
            const res = await execPost({incorrectBody : 'www.google.com'}) 
            expect(res.status).toBe(400)
        })

        it('Should return an Error with Status code 400 is the body of the request contains more than one variable', async () => {
            const res = await execPost({incorectBody : 'www.google.com', someOtherVariable : 'Not Allowed'})
            expect(res.status).toBe(400)
        })

        it('Should Return 400 if we have duplicate entry', async () => {
            await Urls.collection.insertOne({
                originalUrl : "www.google.com",
                shorterUrl :  "example",
                count : 10
            })
            const res = await execPost({longUrl : 'www.google.com'})        
            expect(res.status).toBe(400)
        })

        it('Should Return 200 if Body and Urls are correct', async () => {
                const res = await execPost({longUrl : 'www.google.com'}) 
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('originalUrl', 'www.google.com')
        })
        
    })

    describe('GET /', () => {

        it('Should Return Url not found if there is no Short Url like this in the database', async () => {
            
            const res = await request(server).get('/api/url/noUrlLikeThat');
            expect(res.status).toBe(404);
        })

        it('Should return the number of times the Url have been clicked', async () => {

            await Urls.collection.insertOne({
                originalUrl : "www.wetesting.com/api/urls",
                shorterUrl :  "example",
                count : 10
            })

            const res = await request(server).get('/api/url/example');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({clicked : 10 });

           
        })
    })
})

describe('/', () => {

    beforeEach(() => {  server = require('../app'); })
    afterEach( async () => { 
        server.close(); 
        await Urls.remove({})
    })

    describe('GET /', () => {

        it('Should return 404 and not Redirect if an incorrect short url is passed', async () => {
            await Urls.collection.insertOne({
                originalUrl : "https://www.youtube.com/",
                shorterUrl :  "ytbe",
                count : 10
            })

            const res = await request(server).get('/ytbefalse');
            const newUrl = await Urls.collection.findOne({'shorterUrl': 'ytbe'})
            expect(res.redirect).toBeFalsy
            expect(newUrl).toMatchObject({count : 10})
        })

        it('Should upgrade the count value and call the redirection function if existing Url is called', async () => {
            await Urls.collection.insertOne({
                originalUrl : "https://www.youtube.com/",
                shorterUrl :  "ytbe",
                count : 10
            })

            const res = await request(server).get('/ytbe');
            const newUrl = await Urls.collection.findOne({'shorterUrl': 'ytbe'});
            expect(res.redirect).toBeTruthy
            expect(newUrl).toMatchObject({count : 11})
        })
        
    })
})