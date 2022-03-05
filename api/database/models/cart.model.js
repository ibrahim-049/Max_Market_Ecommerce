const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {type:mongoose.SchemaTypes.ObjectId, required:true, unique:true},
    products:[
        {
            productId:{type:mongoose.SchemaTypes.ObjectId, required:true},
            attributes:[{
                attrName:{type:String, required:true},
                values:{
                    value:{type:String, required:true},
                    quantity:{type:String, required:true},
                    price:{type:Number, required:true}
                }
            }]
        }
    ]
}, {timestamps:true})

const cartModel = mongoose.model('cart' ,cartSchema)

module.exports = cartModel