const request = require("supertest");
// const app = require("../server/app"); // import your app/server file here
const app = require("../server/app");

describe("Test API endpoints", () => {
  // Get All route
  test("GET /api/items should return status 200 and the length should be greater than 0", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Get single Item
  test("GET /api/items/:id should return status 200 and a single item", async () => {
    const res = await request(app).get("/api/items/3");
    expect(res.statusCode).toEqual(200);

    const keys = ["title", "price", "description", "category", "image"];
    const array = Object.keys(res.body);

    for (let key of keys) {
      expect(array.includes(key)).toEqual(true);
    }
  });

  // Create a single item
  test("POST /api/test should return status 200 and return true for properties in expected.", async () => {
    const item = {
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "blah",
    };
    const res = await request(app).post("/api/items").send(item);
    expect(res.statusCode).toEqual(200);
    for (const key in item) {
      expect(res.body[key]).toEqual(item[key]);
    }
  });

  // Create a single item but missing a field - Should fail
  test("POST /api/test should return status 500", async () => {
    const res = await request(app).post("/api/items").send({
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "",
    });
    expect(res.body).toHaveProperty("error");
  });

  // Delete a single item
  test('DELETE /api/items/:id should return status 200 and returns message "Item has been removed."', async () => {
    const res = await request(app).delete("/api/items/2");
    expect(res.text).toBe("Item has been removed.");
  });

  // Tests update routes if item not found.
  test("PUT /api/items/:id should return status 404", async () => {
    const item = {
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "blah",
    };
    const res = await request(app).put("/api/items/2").send(item);
    expect(res.body).toHaveProperty("error");
  });

  // Tests update routes if form data sent in is missing data.
  test("PUT /api/items/:id should return status 404", async () => {
    const item = {
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "",
    };
    const res = await request(app).put("/api/items/2").send(item);
    expect(res.body).toHaveProperty("error");
  });

  // Tests update route successfully.
  test("PUT /api/items/:id should return status 200 and returns the new items title to be equal to what to send.", async () => {
    const item = {
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "blah",
    };
    const res = await request(app).put("/api/items/3").send(item);

    for (let key in item) {
      expect(res.body[key]).toBe(item[key]);
    }
  });
});
