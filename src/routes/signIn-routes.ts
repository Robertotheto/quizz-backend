import { Router } from "express";
import { Register } from '../handlers/signIn/register';


export const signInRoutes = Router()
signInRoutes.post('/signin', Register)