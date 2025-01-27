import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.session.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
