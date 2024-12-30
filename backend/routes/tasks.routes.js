const router=require('express').Router();
const authenticateUser = require('../middlewares/users.authentication');
const {createTask,getTasks,changeTaskStatus} = require('../controllers/tasks.controllers');

router.post('/tasks',authenticateUser,createTask);
router.get('/tasks',authenticateUser,getTasks);
router.put('/tasks/:id',authenticateUser,changeTaskStatus);

module.exports = router;