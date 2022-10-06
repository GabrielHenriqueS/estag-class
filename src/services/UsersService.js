/**
 * @typedef User
 * @type {object}
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {string[]} roles
 * @property {number} birth_year
 */


import database from '../../database.js'

import InstanceError from '../errors/InstanceError.js'
import getBirthYearByAge from '../utils/getBirthYearByAge.js'
import parseResponse from '../utils/parseUserResponse.js'


class UsersService {

  /**
   * @param {String} id 
   * @param {{ageStart: string, ageEnd: string}} filter 
   * @returns {Promise<User[]|User>}
   */
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
 
    // retornar as roles como array
    return parseResponse(response)
  }

  async create(data) {

    const {name, email, roles, age} = data

    if(email){
      const userAlreadyExists = await database.select('email').from('users').where({ email }).first()

      if(userAlreadyExists){
        throw new InstanceError('Já existe um usuário com o email informado')
      }
    }

    const birth_year = getBirthYearByAge(age)

    // "ADMIN,OPERADOR"
    // "\[\"ADMIN",\"OPERADOR\"\]"
    const formattedRoles = JSON.stringify(roles.split(','))

    const [user] = await database.insert({name, email, roles: formattedRoles, age, birth_year})
                                 .into('users')
                                 .returning(['id', 'name', 'age', 'email', 'roles'])
    // TODO retornar as roles como array
    return parseResponse(user)
  }

  async update(id, data) {

    const userExists = await database.select('id').from('users').where({ id }).first()

    if(!userExists){
      throw new InstanceError('Não existe um usuário com o ID informado', 404)
    }

    if(data.roles){
      data.roles = JSON.stringify(data.roles.split(','))
    }

    if(data.age) {
      data.birth_year = getBirthYearByAge(data.age)
    }

    const [updatedUser] = await database
                                .update(data)
                                .from('users')
                                .where({ id })
                                .returning(['id', 'name', 'age', 'email', 'roles'])
    return parseResponse(updatedUser)
  }

  async delete(id){
    return database.from('users').where({ id }).del()
  }

}

export default UsersService