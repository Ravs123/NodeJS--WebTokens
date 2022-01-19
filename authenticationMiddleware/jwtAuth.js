//NOTE : This is a middleware which checks the users authentication i.e the user who is registered can access the certain data . here we create authication function to give access to correct user 

const jwt=require('jsonwebtoken')
const User=require('../dataBase/userSchema')

//here we are grabbing the cookie from the browser which we created i.e 'myCookie'
const requireAuth=(req,res,next)=>{
    const token=req.cookies.myCookie  

    //check json web token exists and is verified
    if(token){
        jwt.verify(token,'this my data',(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next()
            }
        })
   

    }
    else{
        res.redirect('/login')
    }


} 

//displaying the current user in front_end after user login's 
const checkUser=(req,res,next)=>{
    const token=req.cookies.myCookie  

    if(token){
        jwt.verify(token,'this my data',async(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.currentUser=null
                next()
            }else{
                console.log(decodedToken);
                let displayUserData= await User.findById(decodedToken.id)
                res.locals.currentUser=displayUserData
                next()
            }
        })

    }
    else{
        res.locals.currentUser=null
        next()


    }


}



module.exports={requireAuth,checkUser}