import { Router } from "express"
// import { authRequired } from '../middlewares/validateToken.js'
import { getTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/task.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router()
router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', deleteTask)
router.put('/tasks/:id', updateTask)

export default router;