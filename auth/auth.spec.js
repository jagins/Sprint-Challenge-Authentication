const request = require('supertest');

const server = require('../api/server');

describe('POST /api/auth/register', function()
{
    test('should return 201 created', function()
    {
        const user = {
            username: "test1",
            password: "password"
        };
        return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res =>
            {
                expect(res.status).toBe(201);
            })
    })
})