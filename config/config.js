const mongoose = require('mongoose')
const DB = process.env.DB

mongoose.connect(DB)
.then(() => {
    console.log('Database connected successfully')
})
.catch((error)=>{
    console.error("Error connecting to database" +error)
})