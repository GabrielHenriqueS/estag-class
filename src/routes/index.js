import { Router } from 'express'

import UsersController from '../controllers/UsersController.js'

const router = Router()
const usersController = new UsersController()

// GET -> listar todos os usuários ou usuário específico com base no ID
router.get('/users', usersController.index)
router.get('/users/:id', usersController.index)

// POST -> Cadastrar usuário
router.post('/users', usersController.create)

// PUT -> Atualizar usuário com base no ID
router.put('/users/:id', usersController.update)

// DELETE -> Deletar usuário com base no ID
router.delete('/users/:id', usersController.delete)

export default router