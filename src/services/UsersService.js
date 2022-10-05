import database from '../../database.js'


class UsersService {

  async list(id){
    // SELECT * FROM users
    // SELECT * FROM users WHERE id = ${id}

    if(id) {
      // Buscar pelo ID
      return database.select('*').from('users').where({ id }).first()
    }

    return database.select('*').from('users')
    // TODO retornar as roles como array
  }

  async create(data) {
    const [user] = await database.insert(data)
                                 .into('users')
                                 .returning(['id', 'name', 'email', 'roles'])
    // TODO retornar as roles como array
    return user
  }

}

export default UsersService