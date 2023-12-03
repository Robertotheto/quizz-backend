import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { prisma } from '../database/prisma';

interface DecodedToken {
  userId: string;
}

export function authUser(permissions: string[]){
  return async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return response.status(401).json({message: 'Token is missing'})
  }
  const token = authHeader.substring(7);

  try {
    const MY_SECRET_KEY = process.env.MY_SECRET_KEY

    if(!MY_SECRET_KEY) {
      throw new Error("Chave secreta não fornecida")
    }

    const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken

    request.user = {id:  decodedToken.userId}

    if(permissions){
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.userId
        },
        select: {
          role: true
        }
      })
      if (!user || !user.role) {
        return response.status(403).json({ message: 'Permissão negada' });
      }

      const userHasPermission = permissions.some((requiredPermission) =>
        user.role.includes(requiredPermission)
      );

      if (!userHasPermission) {
        return response.status(403).json({ message: 'Permissão negada' });
      }
    }
    return next()
  } catch (error) {
    return response.status(401).json({message: "Token invalido."})
  }
}
}