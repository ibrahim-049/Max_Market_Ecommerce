const userModel = require('../../database/models/user.model')

class Admin {
    static register = async function (req, res){
        try{
            const user = userModel({...req.body, admin:true})
            await user.save()
            
            res.status(200).send({apiStatus:true, data:user, message:"successful registeration"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error a registeration"})
        }
    }
    static login = async function (req,res ) {
        try {
            
            const user = await userModel.login(req.body.username, req.body.password)
            if(user.admin === false) throw new Error("Restricted Access")
            const token = await user.generateToken()
            // console.log(req.headers.authorization.replace('bearer ', ''))
            res.status(200).send({
                apiStatus:true, data:{user, token}, message:"successful admin login"
            })
        }
        catch(e){
            console.log(e)
            res.status(500).send({apiStatus:false, data:e.message, message:"error admin login"})
        }
    }
    static addProduct 
}

module.exports = Admin