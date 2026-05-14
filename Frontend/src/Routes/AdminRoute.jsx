import React from "react";

import {
  Navigate,
} from "react-router-dom";

const AdminRoute = ({
  children,
}) => {
  // GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN

  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  // NOT ADMIN

  if (
    user.role !== "Admin"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  // ADMIN ACCESS

  return children;
};

export default AdminRoute;