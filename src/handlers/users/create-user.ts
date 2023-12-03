import { hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
import zod from 'zod';
import { prisma } from '../../database/prisma';


export async function createUser(request: Request, response: Response){
  const userSchema = zod.object({
    name: zod.string().min(3).max(150),
    email: zod.string().email(),
    password: zod.string().min(4)
  })
  const { name, email, password } = userSchema.parse(request.body)
  const isUserUniqueEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserUniqueEmail) {
    return response.status(400).json({ error: 'Email already exists' });
  }
  const hashedPassword = hashSync(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })
  
  return response.status(201).json(user)
}