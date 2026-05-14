// =====================================
// NURSE ROUTE
// src/Routes/NurseRoute.jsx
// =====================================

import React from "react";

import {
  Navigate,
} from "react-router-dom";

const NurseRoute = ({
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
    user.role !== "Nurse"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default NurseRoute;