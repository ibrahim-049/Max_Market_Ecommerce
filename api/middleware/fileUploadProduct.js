const path = require('path')
const multer = require('multer')
const fs = require('fs')
const productModel = require('../database/models/product.model')

'/images/userid/userid.png'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let loc = `images\\productImages`
        fs.mkdir('images', (err)=>{})
        fs.mkdir(loc, (err)=>{})
        cb(null, loc)
    },
    filename: function(req, file, cb) {
        const myName = `${file.fieldname}-${req.params.id}-${file.originalname}`
        cb(null, myName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        // const product = await productModel.findOne({_id:req.params.id})
        // if(!product) return cb(new Error('Invalid Product'), false)

        if(path.extname(file.originalname) != ".png")
            if(path.extname(file.originalname) != ".jpg")
                return cb(new Error("invalid img type"), false)
        else
            return cb(null, true)
    }
})

module.exports = upload