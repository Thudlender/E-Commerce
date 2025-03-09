import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate, useLocation } from "react-router";

const Protect = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>; // แสดงโหลดก่อนถ้ายังเช็ค auth ไม่เสร็จ
  }
  // ✅ ถ้า user มีอยู่แล้ว และกำลังพยายามเข้าหน้า login/signin → Redirect ไปหน้า Home
  if (
    user &&
    (location.pathname === "/signin" ||
    location.pathname === "/signup")
  ) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protect;