import  { Router } from "express";
import {createPet, getAllPets,getOnePet,updatePet,deleteOnePet} from './pet.controller';

const router = Router()

router
    .route('/')
    .post(createPet)
    .get(getAllPets)
router
    .route('/:id')
    .get(getOnePet)
    .delete(deleteOnePet)
    .put(updatePet)


export default router