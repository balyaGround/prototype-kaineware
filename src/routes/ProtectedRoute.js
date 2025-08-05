// src/routes/ProtectedRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!currentUser) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(currentUser.role))
    return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
