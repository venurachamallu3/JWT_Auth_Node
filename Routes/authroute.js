const express = require('express')
const router = express.Router()
const authcontroller = require('../Controllers/authController')
const logincontroller = require('../Controllers/loginController')
const verifytoken = require('../utils/verfiytoken')


router.route('/signup').post(authcontroller.adduser)
router.route('/login').get(verifytoken.verifytoken,logincontroller.login)

module.exports= router