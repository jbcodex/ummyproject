const express = require('express')
const router = express.Router()

//Controller
const { register, login, getCurrentUser, update } = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidation, loginCreateValidation, updateCreateValidation} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const {imageUpload} = require('../middlewares/imageUpload')

//Routes
router.post('/register', userCreateValidation(),validate, register)
router.post('/login', loginCreateValidation(), validate, login)
router.get('/profile', authGuard, getCurrentUser)
router.put('/', authGuard, updateCreateValidation(), imageUpload.single('profileImage'), validate, update)


module.exports = router