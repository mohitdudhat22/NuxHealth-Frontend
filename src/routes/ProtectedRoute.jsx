import React  from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseDecodeToken from "../hook/useDecodeToken";
import { NHLoader } from "../components/NHLoader";

function ProtectedRoute() {
  // const { token } = UseDecodeToken();
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const [loading, setLoading] = useState(true);

  // Define the roles that are allowed to access the route
  // const requiredRoles = ["Chairman", "resident", "security"];

  // useEffect(() => {
  //   if (token) {
  //     const role = token.role;
  //     if (requiredRoles.includes(role)) {
  //       setIsAuthorized(true);
  //     } else {
  //       setIsAuthorized(false);
  //     }
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [token]);

  // if (loading) {
  //   return <NHLoader />;
  // }

  // if (!token) {
  //   return (
  //     <>
  //       <Navigate to="/login" replace />
  //       <Outlet />
  //     </>
  //   );
  // }

  // if (!isAuthorized) {
  //   return (
  //     <>
  //       <Navigate to="/" replace />;
  //       <Outlet />
  //     </>
  //   );
  // }

  return <Outlet />;
}

export default ProtectedRoute;
