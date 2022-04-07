import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/userApi';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  // le token du storage ou null le cas échéant
  // const [authTokens, setAuthTokens] = useState(
  //   localStorage.getItem('authTokens')
  //     ? JSON.parse(localStorage.getItem('authToken'))
  //     : null
  // );

  // dernière page visitée
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);

      // stockage en localstorage
      localStorage.setItem('authTokens', JSON.stringify(data));
      // On récupère la page ciblée avant rédirection si elle existe
      const to = location.state?.from?.pathname || '/dashboard';
      // On le rédirige
      navigate(to);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = useCallback(() => {
    // stockage en localstorage
    localStorage.clear();
    navigate('/login');
    console.log('you are logged out');
  }, []);

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
