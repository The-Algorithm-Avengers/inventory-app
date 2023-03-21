const request = require("supertest");
const app = require("../server/app"); // import your app/server file here

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
    const array = Object.keys(res.body);
    expect(array.includes("title")).toBe(true);
    expect(array.includes("price")).toBe(true);
    expect(array.includes("description")).toBe(true);
    expect(array.includes("category")).toBe(true);
    expect(array.includes("image")).toBe(true);
  });

  // Create a single item
  test("POST /api/test should return status 200 and return true for properties in expected.", async () => {
    const res = await request(app).post("/api/items").send({
      title: "Test message",
      price: 5,
      description: "hello",
      category: "hi",
      image: "blah",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Test message");
    expect(res.body.price).toEqual(5);
    expect(res.body.description).toEqual("hello");
    expect(res.body.category).toEqual("hi");
    expect(res.body.image).toEqual("blah");
  });

  // Delete a single item
  test('DELETE /api/items/:id should return status 200 and returns message "Item has been removed."', async () => {
    const res = await request(app).delete("/api/items/2");
    expect(res.text).toBe("Item has been removed.");
  });

  // Tests update routes if not found condition.
  test("PUT /api/items/:id should return status 404", async () => {
    const res = await request(app).put("/api/items/2");
    expect(res.statusCode).toEqual(404);
  });


  // Tests update route successfully.
  test("PUT /api/items/:id should return status 200 and returns the new items title to be equal to what to send.", async () => {
    const res = await request(app).put("/api/items/3").send({ title: "STUFF" });
    expect(res.body.title).toBe("STUFF");
  });
});
