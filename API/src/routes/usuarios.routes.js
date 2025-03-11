import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { getUsuarios, getUsuario, deleteUsuario, updateUsuario } from "../controllers/users.controller.js"

const router = Router()
// Consulta todas los usuarios
router.get('/usuarios', authRequired, getUsuarios)
// Consulta un usuario
router.get('/usuarios/:id', authRequired, getUsuario)
// Elimina un usuario
router.delete('/usuarios/:id', authRequired, deleteUsuario)
// Actualiza un usuario
router.put('/usuarios/:id', authRequired, updateUsuario)

export default router;