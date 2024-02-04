const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generationToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '7d',
    })
};

//Register user and Signin
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            res.status(422).json({
                errors: ['Este e-mail já existe! Tente outro.']
            })
            return
        }
        const salt = await bcrypt.genSalt()
        const passwordhash = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: passwordhash
        })

        if (!newUser) {
            res.status(422).json({
                errors: ['Houve um erro! Tente mais tarde!']
            })
        }


        token = generationToken(newUser._id)
        res.status(201).json({
            _id: newUser._id,
            token: token
        })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        res.status(422).json({
            errors: ['Dados incorretos!']
        })
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({
            errors: ['Dados incorretos!']
        })
    }

    token = generationToken(user._id)
    res.status(201).json({
        _id: user._id,
        token: token
    })



}

module.exports = {
    register,
    login
}