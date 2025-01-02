import React, { useEffect, useState, useContext } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks/tasks', {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data || error.message);
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [auth]); 

  const handleEditClick = (taskId) => {
    console.log(`Button clicked for task with ID: ${taskId}`);
    localStorage.setItem('taskId', taskId);
    navigate('/editTask');
  };

  const handleCompleteClick = async (taskId) => {
    try {
      const response = await axios.put(`/tasks/tasks/${taskId}`, {}, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      window.location.reload();
      } catch (error) {
        console.error('Error updating task:', error.response?.data || error.message);
        setError('Failed to update task');
      }
    }
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
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleEditClick(task._id)}
            >
              Edit
            </button>
            <button
              className="mt-2 px-4 py-2 ml-3 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleCompleteClick(task._id)}
            >
              Completed?
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;