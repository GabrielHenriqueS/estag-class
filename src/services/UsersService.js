import database from '../../database.js'

import InstanceError from '../errors/InstanceError.js'


class UsersService {

  async list(id, filter){

    const { ageStart, ageEnd } = filter

    let query = database.select('*').from('users')
    
    // SELECT * FROM users
    // SELECT * FROM users WHERE id = ${id}

    if(id) {
      // Buscar pelo ID
      query = query.where({ id }).first()
    } else if (ageStart && ageEnd) {
      query = query.where("age", ">=", ageStart).andWhere("age", "<=", ageEnd)
    }

    const response = await query
 
    return response
    // TODO retornar as roles como array
  }

  async create(data) {

    if(data.email){
      const userAlreadyExists = await database.select('email').from('users').where({ email: data.email }).first()

      if(userAlreadyExists){
        throw new InstanceError('Já existe um usuário com o email informado')
      }
    }

    const [user] = await database.insert(data)
                                 .into('users')
                                 .returning(['id', 'name', 'age', 'email', 'roles'])
    // TODO retornar as roles como array
    return user
  }

  async update(id, data) {
    const [updatedUser] = await database
                                .update(data)
                                .from('users')
                                .where({ id })
                                .returning(['id', 'name', 'age', 'email', 'roles'])
    return updatedUser
  }

  async delete(id){
    return database.from('users').where({ id }).del()
  }

}

export default UsersService