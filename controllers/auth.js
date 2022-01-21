const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
    const {userName, email, phoneNumber } = req.body
  
    if ( !userName || !email  || !phoneNumber || !password) {
      throw new BadRequestError('Invalid Credential')
    }
    const user = await User.findOne({ userName, email, phoneNumber})
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
  }

  module.exports ={
      login
  }