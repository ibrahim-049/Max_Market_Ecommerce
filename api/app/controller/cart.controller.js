const cartModel = require('../../database/models/cart.model')

class Cart  {
    static addToCart = async(req, res)=>{
        try{
            const cart = new cartModel({userId:req.user._id})
            
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
            const cart= await cartModel.findOne({_id:req.user._id})
            if(!cart) throw new Error('cart not found')
            cart.products.filter(product=> product.productId != req.params.pId)
            res.status(200).send({apiStatus:true, data:{}, message:"Deleted product from cart successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error deleting product from cart"})
        }
    }

}

module.exports = Cart