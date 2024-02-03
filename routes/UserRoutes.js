const express = require('express')
const router = express.Router()

//Controller
const { register, login } = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidation, loginCreateValidation} = require('../middlewares/userValidations')

//Routes
router.post('/register', userCreateValidation(),validate, register)
router.post('/login', loginCreateValidation(), validate, login)


module.exports = router