const productModel = require('../../database/models/product.model')
const path = require('path')
const fs = require("fs")

class Product {
    static addProduct = async(req, res)=>{
        try{
            const product = new productModel({...req.body, userId:req.user._id})
            await product.save()
            res.status(200).send({apiStatus:true, data:product, message:"added product successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error adding product"})
        }
    }
    static addProductImage = async(req, res)=>{
        try{
            const product = await productModel.findOneAndUpdate({_id:req.params.id}, {image:req.file.path})
            if(!product) throw new Error('Product not found')
            res.status(200).send({apiStatus:true, data:product, message:"added product image successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error adding product Image"})
        }

    }
    static editProduct = async(req, res)=>{
        try{
            const product = await productModel.findOneAndUpdate({_id:req.params.id}, req.body)
            if(!product) throw new Error('Product not found')
            res.status(200).send({apiStatus:true, data:product, message:"Edited product successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error editing product"})
        }
    }
    static deleteProduct = async(req, res)=>{
        try{
            const product= await productModel.findOneAndDelete({_id:req.params.id})
            if(!product) throw new Error('Product not found')
            if(product) fs.unlink(path.join('C:\\Users\\thema\\OneDrive\\Desktop\\NTI_MEAN_TASKS\\ecommerce\\s12\\', product.image), (err)=>{if(err) console.log(err)})
            res.status(200).send({apiStatus:true, data:{}, message:"Deleted product successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error deleting product"})
        }
    }
    static showAll = async(req, res)=>{
        try{
            const products = await productModel.find()
            res.status(200).send({apiStatus:true, data:products, message:"showed all products successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error showing all product"})
        }
    }
    static showSingle = async(req, res)=>{
        try{
            const product = await productModel.findOne({_id:req.params.id})
            res.status(200).send({apiStatus:true, data:product, message:"showed single product successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error showing single product"})
        }
    }
}

module.exports = Product