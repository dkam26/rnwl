import { RequestHandler, Request } from "express";
import { ClaimModel } from "../claim/claim.model";
import { PetModel } from "./pet.model";
import { ICreatePetInterface, IResponsePetInterface } from "./pet.interfaces";

export const createPet: RequestHandler = async (
  request: ICreatePetInterface,
  response: IResponsePetInterface
) => {
  const pet = await PetModel.create({ ...request.body });
  return response.status(200).json({
    message: "Pet saved",
    data: pet,
  });
};

export const getOnePet: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  const pet: PetModel | null = await PetModel.findOne({
    where: { id },
    include: [ClaimModel],
  });
  return response.status(200).json({
    message: "Pet",
    data: pet,
  });
};

export const getAllPets: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const pet: PetModel[] = await PetModel.findAll();
  return response.status(200).json({
    message: "Pets",
    data: pet,
  });
};

export const deleteOnePet: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  const petToDelete: PetModel | null = await PetModel.findByPk(id);

  await PetModel.destroy({ where: { id } });
  return response.status(200).json({
    message: "Pet deleted",
    data: petToDelete,
  });
};

export const updatePet: RequestHandler = async (
  request: Request,
  response: IResponsePetInterface
) => {
  const { id } = request.params;
  await PetModel.update({ ...request.body }, { where: { id } });
  const pet: PetModel | null = await PetModel.findByPk(id);
  return response.status(200).json({
    message: "Pet updated",
    data: pet,
  });
};
