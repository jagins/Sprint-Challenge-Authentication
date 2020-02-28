const request = require('supertest');

const server = require('../api/server');

describe('/GET /api/jokes', function()
{
    test('authorization with token being passed to gain access', function()
    {
        const user = {
            username: 'test1',
            password: 'password'
        };

        return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res =>
            {
                return request(server)
                    .post('/api/auth/login')
                    .send(user)
                    .then(res =>
                    {
                        const token = res.body.token
                        return request(server)
                            .get('/api/jokes')
                            .set('Authorization', token)
                            .then(res =>
                            {
                                expect(res.status).toBe(200);
                            })
                    })
            })
    })

    test('returning array is not empty', function()
    {
        const user1 = {
            username: 'test2',
            password: 'password123'
        };

        return request(server)
            .post('/api/auth/register')
            .send(user1)
            .then(res =>
            {
                return request(server)
                    .post('/api/auth/login')
                    .send(user1)
                    .then(res =>
                    {
                        const token = res.body.token
                        return request(server)
                            .get('/api/jokes')
                            .set('Authorization', token)
                            .then(res =>
                            {
                                expect(res.body.length).toBeGreaterThan(0);
                            })
                    })
            })
    })
})