const express = require('express')
require('dotenv').config()
require('./config/config')
const {router} = require('./router/router') 
const app = express()

app.use(express.json())
app.use(router)
// app.get('/users/hompage',res.send("welcome to OTP onboarding"))
// Mock data for the API
const port = process.env.port
app.listen(port, ()=>{
   console.log('server has started and running  on port: ' + port) 
})

