import { Router } from 'express'
import routerV1 from './usersRouterV1.js'
import routerV2 from './usersRouterV2.js'
import sessionsRouter from './sessionsRouter.js'

const router = Router()

router.use(sessionsRouter)
router.use(routerV1)
router.use(routerV2)

export default router