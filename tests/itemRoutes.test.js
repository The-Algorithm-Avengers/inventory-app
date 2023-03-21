const request = require('supertest');
const app = require('../server/app'); // import your app/server file here

describe('Test API endpoints', () => {
  test('GET /api/items should return status 200 and the length should be greater than 0', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0)
  });
    test('GET /api/items/:id should return status 200 and a single item', async () => {
    const res = await request(app).get('/api/items/2');
    expect(res.statusCode).toEqual(200);
    const array = Object.keys(res.body)
    expect(array.includes('title')).toBe(true)
    expect(array.includes('price')).toBe(true)
    expect(array.includes('description')).toBe(true)
    expect(array.includes('category')).toBe(true)
    expect(array.includes('image')).toBe(true)
  });

  test('POST /api/test should return status 200 and message "Test message"', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        title: 'Test message',
        price: 5,
        description: "hello",
        category: "hi",
        image: "blah"    
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test message');
    expect(res.body.price).toEqual(5);
    expect(res.body.description).toEqual('hello');
    expect(res.body.category).toEqual('hi');
    expect(res.body.image).toEqual('blah');
  });

  // Add more test cases for other endpoints as needed
});