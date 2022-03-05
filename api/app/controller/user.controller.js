const userModel = require('../../database/models/user.model')


class User {
    static register = async function (req, res) {
        try{
            if(req.body.admin === '') req.body.admin = undefined
            const user = userModel(req.body)
            await user.save()
            
            res.status(200).send({apiStatus:true, data:user, message:"successful registeration"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error user registeration"})
        }
    }
    static login = async function (req, res) {
        try {
            const user = await userModel.login(req.body.username, req.body.password)
            const token = await user.generateToken()
            // console.log(req.headers.authorization.replace('bearer ', ''))
            res.status(200).send({
                apiStatus:true, data:{user, token}, message:"successful user login"
            })
        }
        catch(e){
            console.log(e)
            res.status(500).send({apiStatus:false, data:e.message, message:"error user login"})
        }
    }
    static logout = async function (req, res){
        try{
            req.user.tokens = req.user.tokens.filter(t=> t.token !== req.token)
            await req.user.save()
            res.status(200).send({apiStatus:true, data:{}, message:"logged out"})   
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error in logout"})
        }
    }
    static editProfile = async function (req, res){
        try{
            const newUser = await userModel.findByIdAndUpdate(req.user._id, req.body)
            res.status(200).send({apiStatus:true, data:newUser, message:"edited profie"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error in editing profile"})
        }
    }
    static editProfileImage = async function(req, res){
        try{
            console.log(req.file)
            req.user.profileImage = req.file.path
            await req.user.save()
            res.status(200).send({apiStatus:true, data:req.user, message:"edited profie Image"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error in editing profile Image"})
        }
    }
    static myProfile = async function(req, res) {
        try{
            const user = await userModel.findOne({_id: req.user._id})
            res.status(200).send({apiStatus:true, data:user, message:"Showed My Profile"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error in showing my profile"})
        }
    }

}

module.exports = User