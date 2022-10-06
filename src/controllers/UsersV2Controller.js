import UsersV2Service from "../services/UsersV2Service.js"

const usersV2Service = new UsersV2Service()

class UsersController {

  async index(request, response) {
    const { id } = request.params
    const { ageStart, ageEnd } = request.query
    // Realizar chamada para listagem de usuários
    const users = await usersV2Service.list(id, { ageStart, ageEnd })

    return response.json(users)
  }

  async create(request, response){
    const { name, email, roles, birth_year } = request.body

    // Chamar metodo de criação no service
    const user = await usersV2Service.create({
      name,
      email,
      birth_year,
      roles
    })

    return response.status(201).json(user)
  }

  async update(request, response){
    // Atualizar o usuário
    const { id } = request.params
    const { name, birth_year, roles, email } = request.body

    const user = await usersV2Service.update(id, {
      name,
      age,
      roles,
      email
    })

    return response.json(user)
  }

  async delete(request, response){
    const { id } = request.params

    await usersV2Service.delete(id)

    return response.sendStatus(204)
  }

}

export default UsersController