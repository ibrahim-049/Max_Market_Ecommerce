const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        trime:true,
        unique:true
    },
    yearOfBirth:{
        type:Date,
    },
    profileImage:{
        type:String,
    },
    tokens:[
        {
            token:{
                type:String,
                trim:true,
                required:true
            }
        }
    ],
    admin:{
        type:Boolean,
        trim:true,
        default:false
    }
}, {timestamps:true})

userSchema.pre('save', async function () {
    if(this.isModified("password"))
        this.password = await bcryptjs.hash(this.password, 5)
})

userSchema.methods.toJSON = function() {
    const user = this.toObject()

    const deleted = ['__v']
    deleted.forEach( d=> delete user[d] )
    return user
}
userSchema.statics.login = async function (uname, pass) {
    const user = await userModel.findOne({username: uname})
    const check = await bcryptjs.compare(pass, user.password)
    if(!check) throw new Error('user not found')
    return user
}
userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({id: user._id}, "s12taskImgU")
    user.tokens.push({token})
    await user.save()
    return token
}

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

