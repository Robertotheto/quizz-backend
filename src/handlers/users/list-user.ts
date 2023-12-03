import { Request, Response } from 'express';
import { prisma } from "../../database/prisma";

export async function listUsers(request: Request, response: Response){
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })
  
  return response.status(200).json(users)
}