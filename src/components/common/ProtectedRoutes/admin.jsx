import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const account = JSON.parse(localStorage.getItem('account') || '{}');

  const isPrivate = account.role;

  if (isPrivate === 'admin') {
    return children;
  } else {
    if (isPrivate === 'store') {
      return <Navigate to="/store" replace />;
    }

    return <Navigate to="/" replace />;
  }
};

export default ProtectedAdmin;
