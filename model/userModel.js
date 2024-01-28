const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Firstname:{type:String, required:true, trim:true},
    Lastname:{type:String, required:true, trim:true},
    Email:{type:String, required:true, trim:true},
    Password:{type:String, required:true, trim:true},
    OTP:{type:String, required:true}

})

const userModel = mongoose.model('OTP', userSchema)
module.exports ={
    userModel
}