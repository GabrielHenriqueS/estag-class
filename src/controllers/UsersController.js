import UsersService from "../services/UsersService.js"

const usersService = new UsersService()

class UsersController {

  async index(request, response) {
    const { id } = request.params
    const { ageStart, ageEnd } = request.query
    // Realizar chamada para listagem de usuários
    const users = await usersService.list(id, { ageStart, ageEnd })

    return response.json(users)
  }

  async create(request, response){
    const { name, email, age, roles } = request.body

    // Chamar metodo de criação no service
    const user = await usersService.create({
      name,
      email,
      age,
      roles
    })

    return response.json(user)
  }

  async update(request, response){
    // Atualizar o usuário
    const { id } = request.params
    const { name, age, roles, email } = request.body

    const user = await usersService.update(id, {
      name,
      age,
      roles,
      email
    })

    return response.json(user)
  }

  async delete(request, response){
    const { id } = request.params

    await usersService.delete(id)

    return response.sendStatus(204)
  }

}

export default UsersController