const {connect}=require('mongoose');
const createError=require('http-errors')
const dev = require('.');

const connectDB=()=>{
    try {
        connect(dev.db.url);
        console.log("DB connected")
    } catch (error) {
       throw createError(error)    
    }
}

module.exports=connectDB