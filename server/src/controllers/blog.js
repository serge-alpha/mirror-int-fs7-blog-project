
const Blog = require("../model/blog")
const createError=require('http-errors')
const { succesMessage } = require("../helper/Response")

const getAllBlogs=async(req,res,next)=>{
    try {
      const blogs=await Blog.findOne({})
      if(!blogs){
        throw createError(404,'blogs is empty')
      }
      succesMessage(res,200,'All blogs',blogs)  
    } catch (error) {
        next(error)
    }
}


const createBlog=async(req,res,next)=>{
  try {
    const {title,text,image}=req.body;
    if(!title||!text){
        throw createError(404,"Title of content of blog is missing");
    }
    
    const exist= await Blog.findOne({title});
    console.log(exist)
    if(exist){
      throw createError(404,'Blog with this title already exist. Please use a diffrent title')
    }
    

    if(image && image.size > (1024 *1024)){
      throw createError(400,'Image size must be less than 2Mbs');
  }    
    const newBlog= new Blog({
     title,
     content,
     image:image.path
    });  
       const blog=await newBlog.save();
       await succesMessage(res,200,'Email Verified',blog);

} catch (error) {
    next(error)
}
}
const updateBlog=async(req,res,next)=>{
  try {
      const user= await User.findById(req.id);
      if(!user){
          throw createError(400,"user with this Id doesn't exist")
      }
      const userUpdate=await User.findByIdAndUpdate(req.id,{...req.body},{new:true});
      if(!userUpdate){
          throw createError(400,'User was not updated');
      }
      if (image){
        userUpdate=await User.findByIdAndUpdate(req.id,{image:req.body.image.path},{new:true});
      }
      await userUpdate.save();
    succesMessage(res,200,'User updated');
  } catch (error) {
      next(error)
  }
}

const deleteBlog=async(req,res)=>{
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
module.exports={createBlog,updateBlog,deleteBlog,getAllBlogs};