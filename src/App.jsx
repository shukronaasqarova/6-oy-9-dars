import React, { useState, useEffect } from 'react'; 
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken && !location.pathname.includes('register')) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate('/login');
    }

    return children; 
  }

  return (
    <div>
      <Routes>
        <Route path='/about' element={<ProtectedRoute isAuthenticated={!!token}><About /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={!!token}><Home /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
