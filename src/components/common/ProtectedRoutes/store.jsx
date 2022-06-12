import { Navigate } from 'react-router-dom';

const ProtectedStore = ({ children }) => {
  const account = JSON.parse(localStorage.getItem('account') || '{}');

  const isPrivate = account.role;

  if (isPrivate === 'store') {
    return children;
  } else {
    if (isPrivate === 'admin') {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }
};

export default ProtectedStore;
