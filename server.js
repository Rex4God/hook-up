const express = require('express');
const app = express()
const logger = require('morgan')
require('dotenv').config();
const connectDB = require('./config/connect')
const authRouter  = require('./routes/auth')
const followersRouter =  require('./routes/follower')
// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');





//Middlewares Declaration
app.use(express.json());
app.use(express.urlencoded({extended: false }))
app.use(logger('dev'))




// Routing Declaration
 app.use('/api/v1', authRouter)
 app.use('/api/v1', followersRouter)


//Error Handler Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);







//Server Connection Configuration

const port = process.env.PORT || 5000
const start =async() =>{
    try{
    await connectDB(process.env.MONGO_URI)
    console.log('CONNECTED TO THE DATABASE @LOCALHOST 27017')
    app.listen(port,console.log(`Server is listening at ${port}.....`))
    }catch(error){
    console.log(error)
    }
}
start()






