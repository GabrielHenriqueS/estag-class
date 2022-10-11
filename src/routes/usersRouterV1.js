import { Router } from 'express'


import { isAuthenticated, isAuthenticatedWith } from '../middlewares/auth.js'
import UsersController from '../controllers/UsersController.js'

const routerV1 = Router()
const usersController = new UsersController()


// POST -> Cadastrar usuário
routerV1.post('/users', usersController.create)

routerV1.use(isAuthenticated)
// GET -> listar todos os usuários ou usuário específico com base no ID
routerV1.get('/users', usersController.index)
routerV1.get('/users/:id', usersController.index)

// PUT -> Atualizar usuário com base no ID
routerV1.put('/users/:id', isAuthenticatedWith(['OPERADOR']) ,usersController.update)

// DELETE -> Deletar usuário com base no ID
routerV1.delete('/users/:id', isAuthenticatedWith(['ADMIN']) ,usersController.delete)

export default routerV1