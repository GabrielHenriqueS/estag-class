import express from 'express'
import jwt from 'jsonwebtoken'
import InstanceError from '../errors/InstanceError.js'

const AUTH_SECRET = 'QEF1dGhTZWNyZXQhRXN0YWdDbGFzcyMh'


/**
 * 
 * @param {express.Request} request 
 * @param {express.Response} _ 
 * @param {express.NextFunction} next 
 */
async function isAuthenticated(request, _, next) {
  const authorization = request.headers.authorization

  if(!authorization){
    throw new InstanceError('O token não foi informado', 401)
  }

  // Bearer <token>
  const [,token] = authorization.split(' ')

  try {
    const { sub: id, roles } = jwt.verify(token, AUTH_SECRET)

    request.user = {
      id,
      roles
    }

    next()
  } catch (error) {
    console.log(error)
    throw new InstanceError('Token inválido', 401)
  }
}

/**
 * 
 * @param {string[]} roles 
 * @returns {(request: express.Request, _: express.Response, next: express.NextFunction) => }
 */
function isAuthenticatedWith(roles) {
  return (request, _, next) => {
    const { roles: userRoles } = request.user
    if(!userRoles.some(role => roles.indexOf(role) >= 0)){
      throw new InstanceError('Usuário não tem permissão para acessar este recurso', 403)
    }
    next()
  }
}


export { isAuthenticated, isAuthenticatedWith }