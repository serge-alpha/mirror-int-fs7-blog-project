const { createUser, verifyUser, updateUser, getAllUsers, loginUser, logoutUser, forgetPassword, resetPassword, deleteUser } = require('../controllers/user');
const { isLogin, isLogOut } = require('../middleware/auth');
const { upload } = require('../middleware/storeFile');

const userRouter =require('express').Router();

// upload.single('image'),
userRouter.post('/', createUser)
userRouter.get('/',verifyUser);
userRouter.put('/update',isLogin,updateUser);
userRouter.get('/',getAllUsers);
userRouter.post('/login',loginUser);
userRouter.get('/logout',logoutUser);
userRouter.delete('/delete/:id',isLogin,deleteUser);
userRouter.post('/forget_password',isLogOut,forgetPassword);
userRouter.post('/reset_password',isLogOut,resetPassword);



module.exports=userRouter;