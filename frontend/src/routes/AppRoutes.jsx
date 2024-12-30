import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Register from '../screens/Register'
import TaskMaker from '../components/TaskMaker'

const AppRoutes = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/createTask" element={<TaskMaker/>} />
                        <Route path="/editTask" element={<Edit/>} />
                  </Routes>
            </BrowserRouter>
      )
}

export default AppRoutes