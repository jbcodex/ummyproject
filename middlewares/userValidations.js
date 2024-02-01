const {body} = require('express-validator')
const userCreateValidation = ()=>{
    return[
        body('name')
            .isString()
            .withMessage('Favor, insira o nome')
            .isLength({min: 3})
            .withMessage('O Nome precisa conter no mínimo 3 caracteres'), 
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatório')
            .isEmail()
            .withMessage('Insira um e-mail válido!'),
        body('password')
            .isString()
            .withMessage('A senha é obrigatória')
            .isLength({min: 5})
            .withMessage('A senha precisa conter no mínimo 5 caracteres'), 
        body('confirmpassword')
        .isString()
        .withMessage('Confirme sua senha')
        .custom((value, {req})=>{
            if(value != req.body.password){
                throw new Error('As senhas não conferem');
            }
            return true
        })
    ]
}
module.exports = {
    userCreateValidation
}