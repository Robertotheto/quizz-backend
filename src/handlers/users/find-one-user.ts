import { Request, Response } from 'express';
import zod from 'zod';
import { prisma } from "../../database/prisma";

export async function findOneUser(request: Request, response: Response){
  const schema = zod.object({
    id: zod.string(),
  });
  
  try {
    const { id } = schema.parse({ id: request.params.id });
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select:{
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
  
}