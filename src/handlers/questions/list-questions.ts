import { Request, Response } from 'express';
import { prisma } from "../../database/prisma";

export async function listQuestions(request: Request, response: Response){
  const questions = await prisma.question.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      userId: true,
      answers: true,
    }
  })
  
  return response.status(200).json(questions)
}