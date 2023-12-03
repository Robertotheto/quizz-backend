import { Request, Response } from 'express';
import zod from 'zod';
import { prisma } from '../../database/prisma';
export async function createQuestions(request: Request, response: Response) {
  const questionSchema = zod.object({
    title: zod.string(),
    body: zod.string(),
    userId: zod.string(),
    correctAnswerIndex: zod.number(),
    answers: zod.array(zod.object({
      body: zod.string(),
    })),
  })
  const { title,body,userId,correctAnswerIndex,answers } = questionSchema.parse(request.body)
  const questionFindExists = await prisma.question.findFirst({
      where: {
        title,
      },
    })
    if(questionFindExists){
      return response.status(400).json({error:'Question already exists'})
    }
    const questions = await prisma.question.create({
      data:{
        title,
        body,
        userId,
        answers: {
          create: answers.map((answer, index) => ({
            body: answer.body,
            isCorrect: index === correctAnswerIndex,
          }))},
      },
      include: {
        answers: true,
      }
    })
    return response.status(201).json(questions)
}