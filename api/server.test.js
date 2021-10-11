// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');


beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(false)
});

describe('server', () =>{

});

/*
Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.
*/