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

    test('password should be hashed and not match the original', function()
    {
        const user = {
            username: 'test2',
            password: 'password123'
        };

        return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res =>
            {
                expect(res.body.password).not.toBe(user.password);
            })
    })

})

describe('POST /api/auth/login', function()
{
    test('should get the error message when providing invalid password', function()
    {
        const user = {
            username: 'test1',
            password: 'password1'
        };

        return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res =>
            {
                expect(res.body.error).toBe('username or password is invalid')
            })
    })

    test('token should be a string', function()
    {
        const user = {
            username: 'test2',
            password: 'password123'
        };

        return request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res =>
            {
                expect(typeof res.body.token).toBe('string');
            })
    })
})