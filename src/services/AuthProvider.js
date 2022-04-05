import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { login } from '../api/userApi';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  // le token du storage ou null le cas échéant
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // dernière page visitée
  const location = useLocation();

  const handleLogin = async (credentials) => {
    login(credentials)
      .then((data) => {
        const { jwt } = data;
        localStorage.setItem('token', jwt);
        setToken(token);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogout = () => {
    console.log('you are logged out');
  };

  const value = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
