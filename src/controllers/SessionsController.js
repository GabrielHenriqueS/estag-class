import express from 'express'
import SessionsService from "../services/SessionsService.js"

const sessionsService = new SessionsService()

class SessionsController {

  /**
   * 
   * @param {express.Request} request 
   * @param {express.Response} response 
   */
  async create(request, response){
    const { email, password } = request.body

    const { user, token } = await sessionsService.create({
      email,
      password
    })

    return response.json({ user, token })
  }

}

export default SessionsController