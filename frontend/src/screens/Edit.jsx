import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

const Edit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = localStorage.getItem('token');
  const taskId = localStorage.getItem('taskId');

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/tasks/edit/${taskId}`, 
        { title, description, priority },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
      setError('Invalid inputs'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Edit Task</h2>
        <form onSubmit={handleEdit} className="space-y-4">
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
            Update
          </button>
          {error && <p className="text-red-800 text-center">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default Edit;