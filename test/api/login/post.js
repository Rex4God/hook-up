const expect = require('chai').expect;
const request = require('supertest');




const server = require ('../../../server.js')
const connectDB = require('../../../config/connect')


describe('POST/login',()=>{
before((done)=>{
connectDB.connectDB()
 .then(()=>done())
 .catch((err) =>done(err));
})

after((done)=>{
    connectDB.close()
     .then(()=>done())
     .catch((err) =>done(err));
    })
    
    it('ok, login  user works',(done)=>{
     request(server).post('/login')
    })
})