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
  const petCreated = {
    name: "Dog",
    age: 6,
    type: "Cat",
    status: "Fully covered",
  };
  const claimCreated = {
    description: "second-irot trial",
    date: "2022-06-22T15:19:26.441Z",
    cost: 45,
    status: "approved",
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

  it("can add pet", async () => {
    const loginResponse = await request(app).post("/user/login").send(testUser);
    const { token } = loginResponse.body;
    const petResponse = await request(app)
      .post("/api/pet")
      .set("Authorization", `Bearer ${token}`)
      .send(petCreated);
    expect(petResponse.body).toHaveProperty("message");
    expect(petResponse.body).toHaveProperty("data");
  });

  it("can get all pets", async () => {
    const loginResponse = await request(app).post("/user/login").send(testUser);
    const { token } = loginResponse.body;
    const getAllPets = await request(app)
      .get("/api/pet")
      .set("Authorization", `Bearer ${token}`);
    expect(getAllPets.body.message).toBe("Pets");
    expect(getAllPets.body).toHaveProperty("data");
    expect(getAllPets.body.data).toBeInstanceOf(Array);
    expect(getAllPets.body.data.length).toBe(1);
  });

  it("can add claim", async () => {
    const loginResponse = await request(app).post("/user/login").send(testUser);
    const { token } = loginResponse.body;
    const claimResponse = await request(app)
      .post("/api/claim")
      .set("Authorization", `Bearer ${token}`)
      .send(claimCreated);
    expect(claimResponse.body).toHaveProperty("message");
    expect(claimResponse.body.message).toBe("Claim saved");
    expect(claimResponse.body).toHaveProperty("data");
  });
});
