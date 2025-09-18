import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component wraps any page that needs login
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in using localStorage flag
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected page
  return children;
};

export default ProtectedRoute;
