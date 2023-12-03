import { compareSync } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import zod from 'zod'
import { prisma } from '../../database/prisma'
export async function Register(request:Request, response:Response) {
  try {
    const userSchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(4)
    })
    const { email, password } = userSchema.parse(request.body)
    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    if (!user) {
      return response.status(400).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await compareSync(password, user.password);

    if (!isPasswordValid) {
      return response.status(400).json({ message: "Senha incorreta." });
    }
    const MY_SECRET_KEY = process.env.MY_SECRET_KEY
    if (!MY_SECRET_KEY) {
      throw new Error("Chave secreta não fornecida");
    }
    const token = sign({
      userId: user.id,
      role: user.role
    }, MY_SECRET_KEY,{
      algorithm: 'HS256',
      expiresIn: '1h'
    })
    return response.status(200).json({token, user:{id: user.id}})
  } catch (error) {
    console.error(error)
    return response.status(400).json(error)
  }
}