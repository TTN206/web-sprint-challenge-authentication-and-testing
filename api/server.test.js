// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

const newUser = { id: 1, username: 'Timmy', password: 'asdf1234' };

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
  expect(true).not.toBe(false);
});

describe('server', () =>{
  describe('[GET] /jokes ', () => {
    it("throws back 500 if user does not login", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toEqual(500);
    });
    
    it("requests without a token get message", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.body.message).toMatch(/token required/i);
    });
  });

  describe('[POST] api/auth/register ', () => {
    it("responds with 201 when username and password are properly set-up", async () => {
      const res = await request(server).post("/api/auth/register").send(newUser);
      expect(res.status).toEqual(201);
    });
    it("saves the user with a bcrypted password instead of plain text", async () => {
      await request(server).post('/api/auth/register').send(newUser);
      const oneUser = await db('users').where('username', 'Timmy').first();
      expect(bcrypt.compareSync('asdf1234', oneUser.password)).toBeTruthy();
    });
  });

});