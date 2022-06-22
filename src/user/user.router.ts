import  { Router } from "express";
import { signUpUser, loginUser } from "./user.controller"

const router = Router()

router
    .route('/signup')
    .post(signUpUser)
router
    .route('/login')
    .post(loginUser)

export default router