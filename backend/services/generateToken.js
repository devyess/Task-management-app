const jwt=require('jsonwebtoken');
const User = require('../models/users.models');

const generateToken = async (email)=>{
      const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'24h'});
      return token;
}

module.exports = generateToken;