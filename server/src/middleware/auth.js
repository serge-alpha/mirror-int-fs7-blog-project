const jwt =require('jsonwebtoken')
const dev = require('../config')
const createError=require('http-errors')
const isLogin=(req,res,next)=>{
    try {
        if(!req.headers.cookie){
            res.status(404).json({message:'Please login'})
        }
       let token=req.headers.cookie.split("=")[1]
       token=token.split(';')[0]
        jwt.verify(token,String(dev.app.authkey),
        async(err,user)=>{
            if(err){
                res.status(404).json({message:'Invalid Token'})
            }   
                console.log(user)  
                 req.id=user.id              
        })
        next()
    } catch (error) {
        next(error)
    }
}

const isLogOut=(req,res,next)=>{
    try {
        if(req.header.cookie){
          return res.status(404).json({message:"Please logout"}) 
          }  
          next();                    
       
    } catch (error) {
        res.status(500).json({message:"Something is wrong"});
    }
}

const isAmin=(req,res)=>{

}

module.exports={isLogin,isLogOut}
