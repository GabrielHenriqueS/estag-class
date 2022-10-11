import express from 'express'

import UsersService from "../services/UsersService.js"

const usersService = new UsersService()

class UsersController {

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response
   */
  async index(request, response) {
    const { id } = request.params
    const { ageStart, ageEnd } = request.query
    // Realizar chamada para listagem de usuários
    const users = await usersService.list(id, { ageStart, ageEnd })

    return response.json(users)
  }

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response
   */
  async create(request, response){
    const { name, email, age, roles, password } = request.body

    // Chamar metodo de criação no service
    const user = await usersService.create({
      name,
      email,
      age,
      roles,
      password
    })

    return response.status(201).json(user)
  }

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response
   */
  async update(request, response){
    // Atualizar o usuário
    const { id } = request.params
    const { name, age, roles, email, password } = request.body

    const user = await usersService.update(id, {
      name,
      age,
      roles,
      email,
      password
    })

    return response.json(user)
  }

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response
   */
  async delete(request, response){
    const { id } = request.params

    await usersService.delete(id)

    return response.sendStatus(204)
  }

}

export default UsersController