const {Schema,model}= require('mongoose');

const userSchema=new Schema({
    name:{
        type: String,
        required:[true,'name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"email is required"],
    },
    password:{
        type:String,
        required:[true ,"password is required"],
        min:6
    },
    image:{
        type:String,
        default:"",
    },
    is_admin:{
        type:Boolean,
        default:false
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    is_Banned:{
        type:Boolean,
        default:false
    },
    is_Login:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User= model('User',userSchema);

module.exports=User;