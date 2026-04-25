import { Navigate, Outlet } from 'react-router-dom';
import { useValidateToken } from '../hooks/User/UserHook';

const ProtectedRoute = () => {
  const { isValid } = useValidateToken();

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};


export default ProtectedRoute;
