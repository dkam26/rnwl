import { UserModel } from "../user/user.model";
import request from "supertest";
import app from "../index";
import { Sequelize } from "sequelize-typescript";
import { PetModel } from "../pet/pet.model";
import { ClaimModel } from "../claim/claim.model";



describe("claim", () => {
  const testUser = {
    email: "kamara@rnwl.com",
    password: "123",
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


  it("can add claim", async () => {
    const response = await request(app).post("/user/signup").send(testUser);
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
