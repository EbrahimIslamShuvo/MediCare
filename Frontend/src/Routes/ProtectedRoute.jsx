import React from "react";

import {
  Navigate,
} from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  // GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN

  if (!user) {
    return (
      <Navigate to="/register" />
    );
  }

  // ROLE NOT ALLOWED

  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default ProtectedRoute;