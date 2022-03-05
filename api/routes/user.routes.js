const router = require('express').Router()
const userController = require('../app/controller/user.controller')
const userAuth = require('../middleware/user.auth')
const adminAuth = require('../middleware/admin.auth')
const upload = require('../middleware/fileUpload')
const adminController = require('../app/controller/admin.controller')
const cartController = require('../app/controller/cart.controller')

router.post('/register', userController.register)
router.post('/admin/register', adminController.register)

router.post('/login', userController.login)
router.post('/admin/login', adminController.login)
router.get('/admin/logout', adminAuth , userController.logout)

router.get('/logout', userAuth , userController.logout)
router.post('/editProfile', userAuth , userController.editProfile)
router.post('/editProfileImage', userAuth, upload.single('ProfileImage'), userController.editProfileImage),
router.get('/show/myProfile', userAuth , userController.myProfile)


router.post('/addToCart/:pId', userAuth, cartController.addToCart)
router.post('/delete/:pId', userAuth, cartController.deleteProduct)



module.exports = router