const path = require('path')
const multer = require('multer')
const fs = require('fs')

'/images/userid/userid.png'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let loc = ""
        if(req.user){
            loc = `images\\${req.user._id}`
        }
        else{
            loc = "images"
        }
        fs.mkdir('images', (err)=>{})
        fs.mkdir(loc, (err)=>{})
        cb(null, loc)
        
    },
    filename: function(req, file, cb) {
        const myName = `${file.fieldname}-${req.user._id}-${file.originalname}`
        cb(null, myName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        if(path.extname(file.originalname) != ".png")
            if(path.extname(file.originalname) != ".jpg")
                return cb(new Error("invalid img type"), false)
        else
            return cb(null, true)
    }
})

module.exports = upload