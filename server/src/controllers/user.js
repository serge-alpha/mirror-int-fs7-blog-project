const createError=require('http-errors');
const { succesMessage } = require('../helper/Response');
const { EncryptPassword, comparePassword } = require('../helper/encrpt_decrypt');
const User = require('../model/user');
const { createToken } = require('../middleware/storeFile');
const dev = require('../config');
const jwt=require('jsonwebtoken');
const sendMail = require('../helper/email');


const createUser=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        if(!name||!password||!email){
            throw createError(404,'Please input all required fields');
        }
        if(password.length < 6){
            throw createError(400,'Password must be greater than 6 characters');
        }
        const hashPassword=await EncryptPassword(password);
        const image=req.file;
        if(image && image.size > (1024 *1024)){
            throw createError(400,'Image size must be less than 2Mbs');
        }
        //Check if user exist
        const user= await User.findOne({email});
        if(user){
            throw createError(400,"User with this email already exist");
        }
       
        //creating token with and without image
        let token={name,email,hashPassword};
        if(image){
            token={...token,image:image.path}
        }
        token= await createToken(token);
        const emailData={
            email,
            subject:"Verify your email",
            html:`<h1>Click here to verify your email</h1>
            <p>Click here to <a href="${dev.app.clientUrl}/auth/activte/${token} target="_blank"> activate your account </a> </p>`,
        }

        await sendMail(emailData);
        succesMessage(res,200,'verify your email please',token);

    } catch (error) {
        next(error)
    }
}

const verifyUser=(req,res,next)=>{
    try {
        const {token}=req.body;
        if(!token){
            throw createError(404,"token is missen");
        }
        jwt.verify(token, dev.app.privateKey, async(err, decoded)=> {
            if (err){
                throw createError(401,'token has expired')
            }
               const {name,email,hashPassword,image}=decoded;
              const isExist= await User.findOne({email:email});
             if(isExist){
                throw createError(401,'User already exist with this email')
             }
             const newUser= new User({
                name:name,
                email:email,
                password:hashPassword,
                is_verified:true
            });

            if(image){
                newUser.image.data=fs.readFileSync(image.path);
                newUser.image.contentType=image.type;
            }
            
           const user=await newUser.save();
           await succesMessage(res,200,'Email Verified',user);
            });
          
       
       
    } catch (error) {
        next(error)
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body; 
        if(!email||!password){
            throw createError(404,"Email or password not found");
        }
        const user= await User.findOne({email:email});
        
        if(!user){
            return res.status(400).json({message:"No user with this email"});
        }
        const passWordMatch=await comparePassword(password,user.password);
        
        if(!passWordMatch){
            return res.status(400).json({message:"Name or password is wrong"})
        }
        // creating token auth for login user
       const token= await jwt.sign({id:user._id}, dev.app.authkey,{expiresIn:"5m"});
    // store token in cookie
    if(req.cookies[`${user._id}`]){
        req.cookies[`${user._id}`]='';
    }
        res.cookie(String(user._id),token,{
            path:'/',
            expires:new Date(Date.now() + 1000 *60*4),
            httpOnly:true,
            secure:true,
            sameSite:'none'
        });
       
        res.status(200).json({
           
            message:"Login successful",
            user:{
                token,
                name:user.name,
            }
         })
         console.log(req.session)
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}

const updateUser=async(req,res,next)=>{
   
    try {
        const user= await User.findById(req.id);
        if(!user){
            throw createError(400,"user with this Id doesn't exist")
        }
        const userUpdate=await User.findByIdAndUpdate(req.id,{...req.body},{new:true});
        if(!userUpdate){
            throw createError(400,'User was not updated');
        }
        // if (req.body.image){
        //     userUpdate=await User.findByIdAndUpdate(req.id,{image:req.body.image.path},{new:true});
        // }
        await userUpdate.save();
      succesMessage(res,200,'User updated');
    } catch (error) {
        next(error)
    }
}
const getAllUsers=async(req,res,next)=>{
    try {
        const users=await User.findOne({})
        if(!users){
          throw createError(404,' No User found')
        }
        succesMessage(res,200,'All Users',users)  
      } catch (error) {
          next(error)
      }
}

const forgetPassword=async(req,res)=>{
    try {
       const{email,password}=req.body;
       if(!email||!password){
        throw createError(404,'Email or password not found')  
    }
    if(password.length<6){
        throw createError(404,'min length of pass word is 6')
    }
    const user= await User.findOne({email:email});
        if(!user){
            throw createError(400,"user with this email doesn't exist");
        }             
        const hashPassword=await EncryptPassword(password);
        const token=await Token({email,hashPassword});

        //create email to be sent

        const emailData={
            email,
            subject:"reset password",
            html:`<h1>Click here to verify reset your</h1>
            <p>Click here to<a href="${dev.app.clientUrl}/auth/reset-password/${token} target="_blank">Reset password</a></p>`,
        }

        sendMail(emailData);
        succesMessage(res,200,"Click link in email to update password",token)
    } catch (error) {
        next(error)
    }
}

const resetPassword= async(req,res)=>{
    try { 
        const {token}=req.body;
        if(!token){
            throw createError(404,"token is missen")
        }
        jwt.verify(token, dev.app.privateKey, async(err, decoded)=> {
            if (err){
                throw createError(401,"token has expired")
            }
              const {email,hashPassword}=decoded;
              const user= await User.findOne({email:email});
             if(!user){
                throw createError(400,"user with this email doesnt exist")
             }
           await User.updateOne({email:email},{
                $set:{
                    password:hashPassword
                }
            })
            succesMessage(res,200,'Password was reseted successsfuly')
            
            });
          
       
    } catch (error) {
        next(error)
    }
}

const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const isExist= await User.findById(id);
        if(!isExist){
            return res.status(400).json({message:"user with this Id doesn't exist"});
        }
        const userData=await User.findByIdAndDelete(id);
        console.log(userData)
        res.status(200).json({message:'user is deleted',ok:true})
    } catch (error) {
        res.status(500).json({message:"somthing went wrong"})
    }
}

const logoutUser=(req,res)=>{
    try {
        const id=req.headers.cookie.split('=')[0];
        res.clearCookie(id)
        res.status(200).json({message:"Logout succesful"})        

    } catch (error) {
        res.status(500).json({message:"Something went wrong"})  
    }
}
module.exports={createUser,forgetPassword,resetPassword,verifyUser,updateUser,getAllUsers,loginUser,logoutUser,deleteUser}