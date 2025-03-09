import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate, useLocation } from "react-router";

const Index = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default Index;