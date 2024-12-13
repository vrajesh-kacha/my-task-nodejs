import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Admin from './components/Admin.tsx';
import Form from './components/Form.tsx';

const App=()=> {
  return (
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="/form" element={<Form />} />
   </Routes>
  );
}

export default App;
