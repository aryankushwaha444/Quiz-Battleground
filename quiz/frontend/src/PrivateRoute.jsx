// src/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
