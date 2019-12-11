'use strict'
const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['username', 'first_name', 'last_name', 'email', 'password'])
      
      const userExists = await User.findBy('email', data.email)
      
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' } })
      }
  
      const user = await User.create(data)
      return user
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
}

module.exports = UserController
