const {Schema,model}= require('mongoose');

const blogSchema=new Schema({
    title:{
        type: String,
        required:[true,'name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    content:{
        type: String,
        required:[true,'name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    image:{
        type:String,
        default:"C:\Users\serge\Desktop\int-fs7-blog-project\server\src\public\blog\image\default.jpeg"
    },
},{timestamps:true})

const Blog= model('Blog',blogSchema);

module.exports=Blog;