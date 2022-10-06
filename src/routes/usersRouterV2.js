import { Router } from 'express'

import UsersV2Controller from '../controllers/UsersV2Controller.js'

const routerV2 = Router()
const usersV2Controller = new UsersV2Controller()

// GET -> listar todos os usuários ou usuário específico com base no ID
routerV2.get('/v2/users', usersV2Controller.index)
routerV2.get('/v2/users/:id', usersV2Controller.index)

// POST -> Cadastrar usuário
routerV2.post('/v2/users', usersV2Controller.create)

// PUT -> Atualizar usuário com base no ID
routerV2.put('/v2/users/:id', usersV2Controller.update)

// DELETE -> Deletar usuário com base no ID
routerV2.delete('/v2/users/:id', usersV2Controller.delete)

export default routerV2