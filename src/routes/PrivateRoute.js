import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  let { token } = useContext(AuthContext);
  console.log('token', token);
  return !token ? <Navigate to="/login" replace /> : children;
};

export default PrivateRoute;
