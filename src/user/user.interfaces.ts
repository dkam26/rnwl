import { Request , Response} from "express";
import { UserModel } from "./user.model";

export interface IUserInterface extends Request {
  user?: UserModel;
}

export interface IUserSignRequestUpIn extends Request {
  body: {
    email: string;
    password: string;
  };
}
export interface IUserSignResponseUpIn extends Response {
    token?: string
}