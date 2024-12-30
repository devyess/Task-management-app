const User = require('../models/users.models');
const userValidation = require('../validation/users.validation');
const hashPassword = require('../services/hashPassword');
const checkPassword = require('../services/checkPassword');
const generateToken = require('../services/generateToken');
const { default: redisClient } = require('../config/redis.config');

const createUser = async (req,res)=>{
      try{
            const result=userValidation.safeParse(req.body);
            if(!result.success){
                  return res.status(400).json({
                        message:result.error.message
                  })
            }
            const {name,email,password} = result.data;
            if(await User.findOne({email})){
                  return res.status(404).json({
                        message:"User already exists"
                  })
            }
            const hashedPassword = await hashPassword(password);

            const user = new User({name,email,password:hashedPassword});
            await user.save();
            return res.status(201).json({
                  message:"User created successfully",
                  user
            })
      }catch(err){
            res.status(500).json({
                  message:err.message
            })
      }
}

const loginUser = async (req,res)=>{
      try{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                  return res.status(404).json({
                        message:"User not found"
                  })
            }
            const matched=await checkPassword(password,user.password); 
            if(!matched){
                  return res.status(400).json({
                        message:"Invalid password"
                  })
            }
            const token = await generateToken(email);
            return res.status(200).json({
                  message:"Logged in successfully",
                  token
            })     
      }catch(err){
            res.status(500).json({
                  message:err.message
            })
      }
}

const logoutUser=async (req,res)=>{
      const token=req.header('Authorization').split(' ')[1];
      if(!token){
            return res.status(401).json({
                  message:"Unauthorized"
            })
      }
      redisClient.set(token, 'logout', 'EX', 3600);
      return res.status(200).json({
            message:"Logged out successfully"
      });
}      

module.exports = {
      createUser,
      loginUser,
      logoutUser
};