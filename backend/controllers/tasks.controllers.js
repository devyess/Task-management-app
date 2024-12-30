const taskModel = require('../models/tasks.models');
const validateTask = require('../validation/tasks.validation');
const mongoose = require('mongoose');
const createTask = async (req,res)=>{
      try{
            const taskValidation = validateTask.safeParse(req.body);
            if(!taskValidation.success){
                  throw new Error("Invalid task details");
            }
            const {title,description,priority} = taskValidation.data;
            const task = new taskModel({title,description,priority,status:false});
            await task.save();
            res.status(201).json({
                  message:"Task created successfully",
                  task
            })
      }catch(err){
            res.status(500).json({
                  message:"Internal server error"
            })
      }
}

const getTasks = async (req,res)=>{
      try{
            const tasks = await taskModel.find({});
            res.status(200).json({
                  message:"Tasks fetched successfully",
                  tasks
            })
      }catch(err){
            res.status(500).json({
                  message:"Internal server error"
            })
      }
}

const changeTaskStatus = async (req,res)=>{
      try{
            const {id} = req.params;
            console.log(id);
            const typeCastedId=new mongoose.Types.ObjectId(id);
            console.log(typeCastedId);
            const task = await taskModel.findById(typeCastedId);
            if(!task){
                  throw new Error("Task not found");
            }
            console.log(task);
            task.status = !task.status;
            await task.save();
            res.status(200).json({
                  message:"Task status updated successfully",
                  task
            })
      }catch(err){
            console.log(err);
            res.status(500).json({
                  message:"Internal server error"
            })
      }
}

module.exports={
      createTask,
      getTasks,
      changeTaskStatus
}