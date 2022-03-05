const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    description:{
        type:String,
        required:true,
    },
    categories:[
        {
            type:String,

        }
    ],
    attributes:[
        {
            attrName:{type:String, required:true},
            values:[
                {
                    value:{type:String, required:true},
                    quantity:{type:String, required:true},
                    price:{type:Number}
                }
            ]
            // {attrName:"x", values:[{val:"xl", q:10, p:15}]}
            // size:[{
            //     type:String,
            //     trim:true,
            // }],
            // color:[{
            //     type:String,
            //     trim:true,
            // }]
        }
    ],
    image:{
        type:String,
        trim:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:"true"
    }

    // price: { type: Number, required: true }
}, {timestamps:true})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel

/*
"categories":["women", "men"],
    "attributes":[{ "attrName":"size",
                     "values":[{ "value":"M", "quantity":"5", "price":"50" }, { "value":"L", "quantity":"10", "price":"50" }] 
                },
                { "attrName":"color",
                     "values":[{ "value":"yellow", "quantity":"5", "price":"50" }, { "value":"black", "quantity":"10", "price":"50" }] 
                }]

*/
