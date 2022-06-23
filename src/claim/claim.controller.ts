import { Request, RequestHandler } from "express";
import { PetModel } from "../pet/pet.model";
import { ClaimModel } from "./claim.model";
import { IClaimInterface, IResponsePetInterface } from "./claim.interfaces";

export const createClaim: RequestHandler = async (
  request: IClaimInterface,
  response: IResponsePetInterface
) => {
  const claim = await ClaimModel.create({ ...request.body });
  return response.status(200).json({
    message: "Claim saved",
    data: claim,
  });
};

export const getOneClaim: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  const claim: ClaimModel | null = await ClaimModel.findByPk(id);
  return response.status(200).json({
    message: "Claim",
    data: claim,
  });
};

export const getAllClaim: RequestHandler = async (
  request,
  response: IResponsePetInterface
) => {
  const claim: ClaimModel[] = await ClaimModel.findAll({ include: [PetModel] });
  return response.status(200).json({
    message: "Claims",
    data: claim,
  });
};

export const deleteOneClaim: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  const claimToDelete: ClaimModel | null = await ClaimModel.findByPk(id);

  await ClaimModel.destroy({ where: { id } });
  return response.status(200).json({
    message: "Claim deleted",
    data: claimToDelete,
  });
};

export const updateClaim: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  await ClaimModel.update({ ...request.body }, { where: { id } });
  const claim: ClaimModel | null = await ClaimModel.findByPk(id);
  return response.status(200).json({
    message: "Claim updated",
    data: claim,
  });
};
