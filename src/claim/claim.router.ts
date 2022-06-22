import  { Router } from "express";
import {createClaim, getAllClaim,getOneClaim,updateClaim,deleteOneClaim} from './claim.controller';

const router = Router()

router
    .route('/')
    .post(createClaim)
    .get(getAllClaim)
router
    .route('/:id')
    .delete(deleteOneClaim)
    .put(updateClaim)
    .get(getOneClaim)


export default router