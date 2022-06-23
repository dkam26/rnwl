import express, { application } from "express";
import { json, urlencoded } from "body-parser";
import connection from "./db/config";
import petRouter from "./pet/pet.router";

import claimRouter from "./claim/claim.router";
import userRouter from "./user/user.router";
import { protect } from "./user/user.auth";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/api", protect);
app.use("/api/pet", petRouter);
app.use("/api/claim", claimRouter);

connection
  .sync({ force: true })
  .then(() => {
    console.log("Database synced succesfully");
  })
  .catch((error) => {
    console.log({ Error: error });
  });

app.listen(3000, () => {
  console.log("server running");
});
