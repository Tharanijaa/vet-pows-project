import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('userRole');
  return role === allowedRole ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;