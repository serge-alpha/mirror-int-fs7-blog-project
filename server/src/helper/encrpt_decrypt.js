const bcrypt = require('bcrypt');
const salt = 10;
const createError=require('http-errors');

const EncryptPassword=async(password)=>{
    try {
       return await  bcrypt.hashSync(password, salt);
    } catch (error) {
         throw createError(400,error)
    }
    
}

const comparePassword=async(password,hashPassword)=>{
    try {
        return await  bcrypt.compare(password,hashPassword);
     } catch (error) {
        throw createError(400,error)
     }
}

module.exports={EncryptPassword,comparePassword};