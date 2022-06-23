import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserModel } from "./user.model";
import { IUserInterface}  from  "./user.interfaces"

export const createToken = (user: UserModel) => {
  return jwt.sign({ id: user.id }, "yourfavoritecolor", {
    expiresIn: "100d",
  });
};

export const verifyToken = async (
  token: string
): Promise<string | undefined | JwtPayload> =>
  await new Promise((resolve, reject) => {
    jwt.verify(token, "yourfavoritecolor", (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });



export const protect: RequestHandler = async (
  request: IUserInterface,
  response,
  next
) => {
  const bearer = request.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return response.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return response.status(401).end().send({ messsage: "Unathorized access" });
  }

  if (typeof payload === "object") {
    const id = payload && payload?.id;
    const user = await UserModel.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(401).end();
    }
    request.user = user;
  }

  next();
};
