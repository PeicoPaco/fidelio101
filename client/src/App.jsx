import React from 'react';
import './App.css';
import AppAdmin from './App';
import { Route, Routes } from "react-router-dom";
import Login from './Demo/Authentification/Login';
function App() {
    return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/consola" element={<AppAdmin />} />
    </Routes>
    );
}
export default App;
