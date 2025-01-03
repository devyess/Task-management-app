const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
      name:{
            type:String,
            required:true,
      },
      email:{
            type:String,
            required:true,
            unique:true,
      },
      password:{
            type:String,
            min:5,
            required:true,
      }
});

module.exports=mongoose.model('User',userSchema);