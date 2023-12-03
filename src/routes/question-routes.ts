import { Router } from "express";
import { createQuestions } from '../handlers/questions/create-questions';
import { listQuestions } from "../handlers/questions/list-questions";
import { authUser } from '../middlewares/auth-user';


export const questionRoutes = Router()
questionRoutes.post('/questions',authUser(['ADMIN']), createQuestions)
questionRoutes.get('/questions',authUser(['ADMIN','USER']), listQuestions)