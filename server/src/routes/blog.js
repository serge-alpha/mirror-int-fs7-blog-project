const { createBlog, getAllBlogs, deleteBlog, updateBlog } = require('../controllers/blog');
const { isLogin } = require('../middleware/auth');
const { upload } = require('../middleware/storeFile');


const blogRouter =require('express').Router();


blogRouter.post('/',upload.single('image'),createBlog);
blogRouter.get('/',isLogin,getAllBlogs)
blogRouter.delete('/:id',isLogin,deleteBlog)
blogRouter.put('/',isLogin,upload.single('image'),updateBlog)

module.exports=blogRouter;