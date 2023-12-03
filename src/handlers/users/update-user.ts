import { Request, Response } from 'express';
import zod from 'zod';
import { prisma } from "../../database/prisma";

export async function updateUser(request: Request, response: Response){
  const schema = zod.object({
    id: zod.string(),
  });
  const userSchema = zod.object({
    name: zod.string().min(3).max(150),
    email: zod.string().email(),
    password: zod.string().min(4)
  })
  const { name, email, password } = userSchema.parse(request.body)
  try {
    const { id } = schema.parse({ id: request.params.id });
    const userId = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userId) {
      return response.status(400).json({ error: 'User not found' });
    }
    const user = await prisma.user.update({
      where:{
        id: userId.id
      },
      data:{
        name,
        email,
        password
      },
      select:{
        id: true,
        name: true,
        email: true,
        role: true
      }
    })
    return response.status(200).json(user)
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
  
}