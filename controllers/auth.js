const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

 const login = async (req, res) => {
   const { emailAddress,password } = req.body
  
    if (!emailAddress || !password) {
     res.status(StatusCodes.BAD_REQUEST).json({ message: "Email or password does not match!" });
    }
    const user = await User.findOne({emailAddress})
     if (!user) {
          
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Email or password does not match!" });
         }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Email or password does not match!" });
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