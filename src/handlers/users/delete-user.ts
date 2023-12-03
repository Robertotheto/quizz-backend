import { Request, Response } from 'express';
import zod from 'zod';
import { prisma } from "../../database/prisma";

export async function deleteUser(request: Request, response: Response){
  const schema = zod.object({
    id: zod.string(),
  });
  
  try {
    const { id } = schema.parse({ id: request.params.id });
    const userId = await prisma.user.deleteMany({
      where: {
        id,
      },
    });
    if (!userId) {
      return response.status(400).json({ error: 'User not found' });
    }
    return response.status(204).send();
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
  
}