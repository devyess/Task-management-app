const taskModel = require('../models/tasks.models');
const mongoose = require('mongoose');
const createTask = async (req, res) => {
      try {
        const { title, description, priority } = req.body;
        const userId = req.user.id; // Get the user ID from the request object
    
        const task = new taskModel({
          title,
          description,
          priority,
          userId, // Set the user ID

        });
    
        await task.save();
    
        res.status(201).json({
          message: "Task created successfully",
          task
        });
      } catch (err) {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    };

    const getTasks = async (req, res) => {
      try {
        const userId = req.user.id;
        const tasks = await taskModel.find({ userId });
    
        res.status(200).json({
          message: "Tasks fetched successfully",
          tasks
        });
      } catch (err) {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    };

    const changeTaskStatus = async (req, res) => {
      try {
        const { id } = req.params;
        const userId = req.user.id; // Get the user ID from the request object
    
        const typeCastedId = new mongoose.Types.ObjectId(id);
        const task = await taskModel.findOne({ _id: typeCastedId, userId }); // Find task by ID and user ID
    
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        task.status = !task.status;
        await task.save();
    
        res.status(200).json({
          message: "Task status updated successfully",
          task
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal server error"
        });
      }
    };
    
    const editTask = async (req, res) => {
      try {
        const { id } = req.params;
        const userId = req.user.id; // Get the user ID from the request object
    
        const typeCastedId = new mongoose.Types.ObjectId(id);
        const task = await taskModel.findOne({ _id: typeCastedId, userId }); // Find task by ID and user ID
    
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        const { title, description, priority } = req.body;
        task.title = title;
        task.description = description;
        task.priority = priority;
        await task.save();
    
        res.status(200).json({
          message: "Task updated successfully",
          task
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal server error"
        });
      }
    };

module.exports={
      createTask,
      getTasks,
      changeTaskStatus,
      editTask
}