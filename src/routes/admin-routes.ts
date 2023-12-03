import { Router } from "express";
import { createAdmin } from '../handlers/admin/create-user-admin';


export const adminRoutes = Router()
adminRoutes.post('/admin', createAdmin)