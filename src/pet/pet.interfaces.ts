import { Request, Response } from "express";
import { PetModel } from "./pet.model";

enum petTypes {
  CAT = "Cat",
  DOG = "Dog",
  LIZARD = "Lizard",
  OTHER = "Other",
}
enum statusTypes {
  FULLY_COVERED = "Fully covered",
  ACCIDENT_ONLY = "Accident only",
  NO_COVER = "No cover",
}
export interface ICreatePetInterface extends Request {
  body: { name: string; age: number; type: petTypes; status: statusTypes };
}

export interface IResponsePetInterface extends Response {
    message?: string,
    data?: PetModel
  }
