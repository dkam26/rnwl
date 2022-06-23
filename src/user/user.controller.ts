import { RequestHandler,  } from "express";
import { UserModel } from "./user.model";
import { createToken } from "./user.auth";
import { IUserSignRequestUpIn, IUserSignResponseUpIn } from "./user.interfaces"


export const signUpUser: RequestHandler = async (request:IUserSignRequestUpIn, response:IUserSignResponseUpIn) => {

  if (!request.body.email || !request.body.password) {
    return response.status(400).send({ message: "need email and password" });
  }

  try {
    const user = await UserModel.create(request.body);
    const token = createToken(user);
    return response.status(201).send({ token });
  } catch (e) {
    return response.status(500).end().send({error:e});
  }
};

export const loginUser: RequestHandler = async (request:IUserSignRequestUpIn, response: IUserSignResponseUpIn) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).send({ message: "Need email and password" });
  }

  try {
    const user = await UserModel.findOne({
      where: { email: email, password: password },
    });

    if (!user) {
      return response
        .status(401)
        .send({ message: "Invalid email or passoword " });
    }

    const token = createToken(user);
    return response.status(201).send({ token });
  } catch (e) {
    console.error(e);
    response.status(500).end().send({error:e});
  }
};
