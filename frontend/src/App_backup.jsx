import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './styles/index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };
  
  const handleAdminClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else {
      window.location.href = '/admin';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-vintage-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-vintage-ink">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home onAdminClick={handleAdminClick} showAdminButton={isAuthenticated} />} 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/admin" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? (
              <Admin onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
