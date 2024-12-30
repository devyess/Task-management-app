const router= require('express').Router();
const {createUser,loginUser,logoutUser} = require('../controllers/users.controllers');
console.log(createUser,loginUser,logoutUser);
router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
module.exports = router;