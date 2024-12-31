import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { AuthContext } from '../context/AuthContext';

const TaskMaker = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks/tasks', 
        { title, description, priority },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error.response.data);
      setError('Invalid inputs'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Create Task</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300">Priority</label>
            <input
              type="range"
              id="priority"
              min="1"
              max="5"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-gray-300">Priority: {priority}</div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Create
          </button>
          {error && <p className="text-red-800 text-center">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default TaskMaker;