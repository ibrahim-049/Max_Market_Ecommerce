
const cartModel = require('../../database/models/cart.model')
const mongoose = require('mongoose')


class Cart  {
    static addToCart = async(req, res)=>{
        try{
            
            const cart = await cartModel.findOne({userId:req.user._id})
            console.log(cart.products)
            if(!cart) cart = new cartModel({userId:req.user._id})
            
            
            cart.products.push({...req.body, productId:req.params.pId})
            await cart.save()
            res.status(200).send({apiStatus:true, data:cart, message:"added to cart successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error adding to cart"})
        }
    }
    static deleteProduct = async(req, res)=>{
        try{
            const cart = await cartModel.findOne({userId:req.user._id})
            if(!cart) throw new Error('cart not found')
            // cart.products.filter(product => product.productId != mongoose.Types.ObjectId(req.params.pId))
            const productIndex = cart.products.findIndex(product=>product.productId == req.user._id)
            cart.products.splice(productIndex, 1)
            await cart.save()

            res.status(200).send({apiStatus:true, data:{}, message:"Deleted product from cart successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error deleting product from cart"})
        }
    }

}

module.exports = Cart