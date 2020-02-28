const request = require('supertest');

const server = require('../api/server');

describe('/GET /api/jokes', function()
{
    test('token is sent', function()
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
})