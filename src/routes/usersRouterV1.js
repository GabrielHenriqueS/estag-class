import { Router } from 'express'

import UsersController from '../controllers/UsersController.js'

const routerV1 = Router()
const usersController = new UsersController()

// GET -> listar todos os usuários ou usuário específico com base no ID
routerV1.get('/users', usersController.index)
routerV1.get('/users/:id', usersController.index)

// POST -> Cadastrar usuário
routerV1.post('/users', usersController.create)

// PUT -> Atualizar usuário com base no ID
routerV1.put('/users/:id', usersController.update)

// DELETE -> Deletar usuário com base no ID
routerV1.delete('/users/:id', usersController.delete)

export default routerV1