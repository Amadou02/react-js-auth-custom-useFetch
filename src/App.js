import './App.scss';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AuthProvider from './services/AuthProvider';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/errors/NoMatch';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <div className="container-fluid">
          <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
