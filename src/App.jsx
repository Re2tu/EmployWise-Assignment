import React, { useState } from 'react'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Display from './Components/UserList'
import EditUser from './Components/EditUser'
import ProtectedRoute from './Components/ProtectedRoute'
import {Toaster} from 'react-hot-toast'
function App(){
  return (
      <BrowserRouter>
      <Toaster position="top-right"/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
          <Route path="/users" element={ <Display  />}/>
          <Route path="/users/:id/edit" element={<EditUser /> }/>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App
