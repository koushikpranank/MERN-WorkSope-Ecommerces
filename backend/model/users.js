const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    secondName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,required:true,default:"user"},
    phoneNo:{type:String,length:10,required:true,unique:true},
    gender:{type:String,required:true}, 
    address:{type:String,required:true,default:"NA"},
    password:{type:String,required:true},
    state:{type:String,required:true}, 
},{timestamps:true});
const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;