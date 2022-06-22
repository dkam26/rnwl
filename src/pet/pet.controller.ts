import { RequestHandler } from "express";
import { ClaimModel } from "../claim/claim.model";
import { PetModel } from "./pet.model";

export const createPet: RequestHandler = async (request, response) => {
  const pet = await PetModel.create({ ...request.body });
  return response.status(200).json({
    message: "Pet saved",
    data: pet,
  });
};

export const getOnePet: RequestHandler = async (request, response) => {
  const { id } = request.params;
  const claim: PetModel | null = await PetModel.findOne({
    where: { id },
    include: [ClaimModel],
  });
  return response.status(200).json({
    message: "Pet",
    data: claim,
  });
};

export const getAllPets: RequestHandler = async (request, response) => {
  const claim: PetModel[] = await PetModel.findAll();
  return response.status(200).json({
    message: "Pets",
    data: claim,
  });
};

export const deleteOnePet: RequestHandler = async (request, response) => {
  const { id } = request.params;
  const claimToDelete: PetModel | null = await PetModel.findByPk(id);

  await PetModel.destroy({ where: { id } });
  return response.status(200).json({
    message: "Pet deleted",
    data: claimToDelete,
  });
};

export const updatePet: RequestHandler = async (request, response) => {
  const { id } = request.params;
  await PetModel.update({ ...request.body }, { where: { id } });
  const claim: PetModel | null = await PetModel.findByPk(id);
  return response.status(200).json({
    message: "Pet updated",
    data: claim,
  });
};
