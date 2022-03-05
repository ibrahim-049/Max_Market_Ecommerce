const productController = require('../app/controller/product.controller')
const router = require('express').Router()
const userAuth = require('../middleware/user.auth')
const uploadProduct = require('../middleware/fileUploadProduct')
const adminAuth = require('../middleware/admin.auth')


router.post('/add', adminAuth, productController.addProduct)

router.post('/addImage/:id', adminAuth, uploadProduct.single('productImage') ,productController.addProductImage)

router.post('/edit/:id', adminAuth, productController.editProduct)
router.post('/delete/:id', adminAuth, productController.deleteProduct)

router.get('/all', productController.showAll)
router.get('/:id', productController.showSingle)



module.exports = router