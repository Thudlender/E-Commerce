import React,{Children, useContext} from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate, useLocation } from "react-router";
const AdminRoute = ({children}) => {
  const { user, isLoading, getUser } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if(user && userInfo.role === "admin"){
    return children;
  }

  
  return <>
   <Navigate to="/signin" state={{ from: location }} replace />;
    
  </>;
};

export default AdminRoute;