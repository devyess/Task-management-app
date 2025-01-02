const router=require('express').Router();
const authenticateUser = require('../middlewares/users.authentication');
const {createTask,getTasks,editTask,changeTaskStatus} = require('../controllers/tasks.controllers');

router.post('/tasks',authenticateUser,createTask);
router.get('/tasks',authenticateUser,getTasks);
router.put('/tasks/:id',authenticateUser,changeTaskStatus);
router.put('/edit/:id',authenticateUser,editTask);

module.exports = router;