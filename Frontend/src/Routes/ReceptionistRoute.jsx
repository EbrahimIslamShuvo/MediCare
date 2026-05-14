// =====================================
// RECEPTIONIST ROUTE
// src/Routes/ReceptionistRoute.jsx
// =====================================

import React from "react";

import {
  Navigate,
} from "react-router-dom";

const ReceptionistRoute = ({
  children,
}) => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  if (
    user.role !==
    "Receptionist"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default ReceptionistRoute;