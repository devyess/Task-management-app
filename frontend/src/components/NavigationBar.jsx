import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TaskMaker from '../screens/TaskMaker';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const addTask = () => {
    navigate('/createTask');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='flex justify-between items-center p-4'>
      <button
        className="bg-black text-white px-3 py-6 rounded hover:bg-gray-800"
        onClick={addTask}
      >
        Add a task
      </button>
      <button
        className="bg-black text-white px-3 py-6 rounded hover:bg-gray-800"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default NavigationBar;