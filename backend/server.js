const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//users and tasks endpoints
const users = require('./routes/user.routes');
const tasks = require('./routes/tasks.routes');
const connectDB=require('./config/connection');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/users', users);
app.use('/tasks', tasks);

app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);   
});