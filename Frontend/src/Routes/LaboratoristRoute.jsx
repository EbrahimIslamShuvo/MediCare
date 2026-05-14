// =====================================
// LABORATORIST ROUTE
// src/Routes/LaboratoristRoute.jsx
// =====================================

import React from "react";

import {
  Navigate,
} from "react-router-dom";

const LaboratoristRoute = ({
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
    "Laboratorist"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default LaboratoristRoute;