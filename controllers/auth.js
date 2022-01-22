const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
    const { emailAddress,password } = req.body
  
    if (!emailAddress &&!password) {
      throw new BadRequestError('Invalid Credential')
    }
    const user = await User.findOne({emailAddress})
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user:{ 
        fullname: user.fullname,
        phoneNumber: user.phoneNumber,
        emailAddress: user.emailAddress,
        gender: user.gender,
        status: user.status
         },token })
  }







  module.exports ={
      login
  }