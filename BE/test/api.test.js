import request from "supertest";
import app from "../index.js";
import sequelize from "../DB/configDB.js";
import User from "../DB/Models/User.js";
import Task from "../DB/Models/task.js";

let token = "";

beforeAll(async () => {
  // Sync DB for testing (fresh start)
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Authentication", () => {
  it("should signup successfully", async () => {
    const res = await request(app)
      .post("/api/user/signup")
      .send({
        fullName: "Test User",
        email: "test@example.com",
        password: "Pass@1234"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should signin successfully", async () => {
    const res = await request(app)
      .post("/api/user/signin")
      .send({
        email: "test@example.com",
        password: "Pass@1234"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
});

describe("Task CRUD", () => {
  let taskId = null;

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "First Task",
        description: "This is the first task"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "First Task");
    taskId = res.body.id;
  });

  it("should get all tasks", async () => {
    const res = await request(app)
      .get("/api/task")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.Tasks)).toBe(true);
  });

  it("should update a task", async () => {
    const res = await request(app)
      .put(`/api/task?taskId=${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Task",
        completed: true
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Task");
  });

  it("should delete a task", async () => {
    const res = await request(app)
      .delete(`/api/task?taskId=${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Task deleted");
  });
});
