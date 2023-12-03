import { Router } from "express";
import { submitAnswers } from '../handlers/answers/submit-answer';
import { authUser } from '../middlewares/auth-user';


export const answerRoutes = Router()
answerRoutes.post('/answer',authUser(['ADMIN','USER']), submitAnswers)