import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  let user;
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
