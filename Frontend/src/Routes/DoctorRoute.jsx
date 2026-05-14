import React from "react";

import {
  Navigate,
} from "react-router-dom";

const DoctorRoute = ({
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
    user.role !== "Doctor"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default DoctorRoute;