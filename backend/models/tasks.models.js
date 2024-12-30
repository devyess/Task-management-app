const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
      title:{
            type:String,
            required:true,
      },
      description:{
            type:String,
            required:true,
      },
      priority:{
            type:Number,
            min:1,
            max:5,
            required:true,
      },
      status:{
            type:Boolean,
            default:false,
            required:true,
      },
},{
      timestamps:true,
});

module.exports=mongoose.model('Task',taskSchema);