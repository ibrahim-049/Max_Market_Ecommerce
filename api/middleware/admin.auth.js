const jwt = require('jsonwebtoken')
const userModel = require('../database/models/user.model')

const auth = async (req, res, next) =>{
    try{
        
        const token = req.headers.authorization.replace('bearer ', '')
        const vToken = jwt.verify(token, "s12taskImgU")
        const user = await userModel.findOne({_id:vToken.id, "tokens.token":token})
        if(!user) throw new Error("auth failed error in user")
        if(!user.admin) throw new Error('Restricted Access')
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, date:e.message, message:"not authorized"})
    }
}

module.exports = auth