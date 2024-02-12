const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require('mongoose')

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

    const token = generationToken(user._id)
    res.status(201).json({
        _id: user._id,
        token: token
    })
}

const getCurrentUser = async(req, res) => {
    const user = req.user
    res.status(201).json(user)
}

const update = async(req,res) => {
    try {
        const { name, password, bio } = req.body
    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user
    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password')

    if(name){
        user.name = name
    }

    if(password){
        const salt = await bcrypt.genSalt()
        const passwordhash = await bcrypt.hash(password, salt)
        user.password = passwordhash
    }

    if(profileImage){
        user.profileImage = profileImage
    }

    if(bio){
        user.bio = bio
    }

    res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update
}