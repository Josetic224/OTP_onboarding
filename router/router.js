const express =  require('express')
const router = express.Router()

const {validateUserRegistration, handleValidationErrors} = require('../validation/validator')
const { signupUser } = require('../controller/usercontroller')
const { verifyOTP } = require('../controller/otpController')

router.post('/user/register', validateUserRegistration,handleValidationErrors, signupUser)
router.post('/user/verifyOTP',verifyOTP)

module.exports = {router}