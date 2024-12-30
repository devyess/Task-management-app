import React from 'react';
import NavigationBar from '../components/NavigationBar';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <TaskList />
    </div>
  );
};

export default Home;