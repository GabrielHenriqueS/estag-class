import { Router } from 'express'

import SessionsController from '../controllers/SessionsController.js'

const sessionsController = new SessionsController()
const sessionsRouter = Router()

sessionsRouter.post('/sessions', sessionsController.create)

export default sessionsRouter