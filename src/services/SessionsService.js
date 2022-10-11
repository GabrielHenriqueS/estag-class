import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import database from '../../database.js'
import InstanceError from '../errors/InstanceError.js'

const AUTH_SECRET = 'QEF1dGhTZWNyZXQhRXN0YWdDbGFzcyMh'

class SessionsService {

  /**
   * 
   * @param {Object} data 
   * @param {string} data.email 
   * @param {string} data.password 
   * @returns {{user: {name: string, email: string}, token: string}}
   */
  async create({ email, password }){
    const userExists = await database
                                .select(['id', 'name', 'email', 'password_hash', 'roles'])
                                .from('users')
                                .where({ email })
                                .first()

    if(!userExists){
      throw new InstanceError('Dados incorretos, tente novamente', 401)
    }

    const { id, password_hash, name, roles } = userExists


    const passwordMatched = await bcrypt.compare(password, password_hash)

    if(!passwordMatched) {
      throw new InstanceError('Dados incorretos, tente novamente', 401)
    }


    const token = jwt.sign({
      name,
      email,
      roles: JSON.parse(roles)
    }, AUTH_SECRET, {
      subject: String(id),
      expiresIn: '1d'
    })

    return {
      user: {
        name,
        email
      },
      token
    }

  }

}

export default SessionsService