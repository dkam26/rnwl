import { Request, Response } from "express";
import { ClaimModel } from "./claim.model";

enum claimTypes {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  OTHER = "Other",
}

export interface IClaimInterface extends Request {
  body: {
    description: string;
    date: Date;
    cost: number;
    status: claimTypes;
    petId: string;
  };
}

export interface IResponsePetInterface extends Response {
  message?: string;
  data?: ClaimModel;
}
