const express = require("express")
const app = express()
const cors = require('cors')
require("../../database/connection")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRoutes = require("../../routes/user.routes")
app.use("/api/user",userRoutes) 
const productRoutes = require('../../routes/product.routes')
app.use('/api/product', productRoutes)

app.get('/image/:fol/:sub/:imgName', (req,res)=>{
    // res.send(req.params.path)
    const path = require("path")
    res.sendFile(path.join(__dirname ,`../../${req.params.fol}/${req.params.sub}/${req.params.imgName}`))
})
app.get("*", (req,res)=> res.status(500).send( {error:"Wrong URL"} ) )



module.exports= app