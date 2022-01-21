const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
    const {userName, emailAddress, phoneNumber } = req.body
  
    if ( !userName || !emailAddress  || !phoneNumber || !password) {
      throw new BadRequestError('Invalid Credential')
    }
    const user = await User.findOne({ userName, emailAddress, phoneNumber})
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { 
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