import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens')) || null;

  const location = useLocation();
  return !authTokens ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default PrivateRoute;
