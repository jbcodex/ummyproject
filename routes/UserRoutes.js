const express = require('express')
const router = express.Router()

//Controller
const { register, login, getCurrentUser } = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidation, loginCreateValidation} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')

//Routes
router.post('/register', userCreateValidation(),validate, register)
router.post('/login', loginCreateValidation(), validate, login)
router.get('/profile', authGuard, getCurrentUser)


module.exports = router