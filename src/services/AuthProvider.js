import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const handleLogin = (data) => {
    console.log(data);
  };

  const handleLogout = () => {
    console.log('you are logged out');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
