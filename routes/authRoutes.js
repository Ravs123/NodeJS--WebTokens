const express =require('express')
const authController=require('../controllers/authController')

const router=express.Router() 



router.get('/signUp',authController.signUp_get)// signIn page for registered users
router.post('/signUp',authController.signUp_post)//creating new account
router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
router.get('/logout',authController.logout_get)



module.exports=router;