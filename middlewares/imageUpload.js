const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        let folder = ''
        if(req.baseUrl.includes('users')){
            folder = 'users'
        }else if(req.baseUrl.includes('photo')){
            folder = 'photo'
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Somente png ou jpg'))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}