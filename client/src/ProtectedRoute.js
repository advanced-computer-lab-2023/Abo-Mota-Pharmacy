import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticatedPharmacy, userRolePharmacy } = useSelector((state) => state.user);
  console.log(isAuthenticatedPharmacy, userRolePharmacy);
  const location = useLocation();
  // console.log(location);
  if (!isAuthenticatedPharmacy) {
    console.log("auth");
    // Not logged in so redirect to login page
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(userRolePharmacy)) {
    // Role not authorised so redirect to a different page
    console.log("inside role");
    return <Navigate to={`/${userRolePharmacy}`} />;
  }

  // Authorized so render child routes
  return <Outlet />;
};

export default ProtectedRoute;
