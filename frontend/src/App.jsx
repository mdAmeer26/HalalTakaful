import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Plans from './pages/Plans'
import Claims from './pages/Claims'
import Transparency from './pages/Transparency'
import Donate from './pages/Donate'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/donate" element={<Donate />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/plans" 
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/claims" 
          element={
            <ProtectedRoute>
              <Claims />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
