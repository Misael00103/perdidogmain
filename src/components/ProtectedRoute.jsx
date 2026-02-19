import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("perdidog_token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
