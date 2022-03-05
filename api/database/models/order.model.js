const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {type:mongoose.SchemaTypes.ObjectId, required:true},
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
    ],
    status: {type:String, default:"pending"},
    address: {type:String}
}, {timestamps:true})

const orderModel = mongoose.model('order' ,orderSchema)

module.exports = orderModel