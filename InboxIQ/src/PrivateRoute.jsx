import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { session } = useAuth();
  const navigate = useNavigate();
  return <>{session ? <>{children}</> : <><Navigate to={'/login'} /></>}</>;
}

export default PrivateRoute;
