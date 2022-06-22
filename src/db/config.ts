import { Sequelize } from "sequelize-typescript";
import { PetModel } from "../pet/pet.model";
import { ClaimModel } from "../claim/claim.model";
const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [PetModel, ClaimModel],
});

export default connection;
