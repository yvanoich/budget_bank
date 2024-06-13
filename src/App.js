import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Dashboard />} />
          </Route>
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
