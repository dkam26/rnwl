
import { RequestHandler } from "express";
import { UserModel } from "./user.model";

export const signUpUser: RequestHandler = async (request, response) => {
    const user = await UserModel.create({ ...request.body });
    return response.status(200).json({
      message: "Account created",
      data: user,
    });
  };

  export const loginUser: RequestHandler = async (request, response) => {
    const {  email, password } =  request.body
    const user: UserModel | null = await UserModel.findOne({where:{
        email,password
    }})
    return response.status(200).json({
      message: "Pet",
      data: user,
    });
  };