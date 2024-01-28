const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generationToken = (id) =>{
    return jwt.sign({ id }, jwtSecret, {
        expiresIn:'7d',
    })
};

//Register user and Signin
const register = async(req, res)=>{
    res.send('Page register')
}

module.exports = {
    register,
}