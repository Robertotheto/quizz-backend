import { Router } from 'express'

import { createUser } from '../handlers/users/create-user'
import { deleteUser } from '../handlers/users/delete-user'
import { findOneUser } from '../handlers/users/find-one-user'
import { listUsers } from '../handlers/users/list-user'
import { updateUser } from '../handlers/users/update-user'
import { authUser } from '../middlewares/auth-user'

export const userRoutes = Router()

userRoutes.post('/users', createUser)
userRoutes.get('/users',authUser(['ADMIN']), listUsers)
userRoutes.get('/users/:id', authUser(['ADMIN','USER']),findOneUser)
userRoutes.delete('/users/:id', authUser(['ADMIN']),deleteUser)
userRoutes.put('/users/:id', authUser(['ADMIN','USER']),updateUser)