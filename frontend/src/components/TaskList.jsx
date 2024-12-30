import React, { useEffect, useState, useContext } from 'react';
import axios from '../config/axios';
import { AuthContext } from '../context/AuthContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks/tasks', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.response.data);
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [auth.token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-white">Task List</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 bg-gray-800 rounded shadow-md">
            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
            <p className="text-gray-400">Priority: {task.priority}</p>
            <p className="text-gray-400">Status: {task.status ? 'Completed' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;