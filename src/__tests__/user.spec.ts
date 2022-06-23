import { UserModel } from "../user/user.model";
import request from "supertest";
import app from "../index";
import { Sequelize } from "sequelize-typescript";
import { PetModel } from "../pet/pet.model";
import { ClaimModel } from "../claim/claim.model";



describe("user", () => {
  const testUser = {
    email: "kamara@rnwl.com",
    password: "123",
  };

  beforeAll(async () => {
    const connection = new Sequelize({
      dialect: "mysql",
      host: "localhost",
      username: "root",
      password: "123456",
      database: "test_db",
      logging: false,
      models: [PetModel, ClaimModel, UserModel],
    });
    await connection.sync({ force: true }).then(() => {});
  });

  it("can signup a user", async () => {
    const response = await request(app).post("/user/signup").send(testUser);
    expect(response.body).toHaveProperty("token");
  });

  it("can login a user", async () => {
    const response = await request(app).post("/user/login").send(testUser);
    expect(response.body).toHaveProperty("token");
  });

  it("can check invalid login", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "k@rnwl.com", password: "1" });
    expect(response.body).toMatchObject({
      message: "Invalid email or passoword ",
    });
  });
});
