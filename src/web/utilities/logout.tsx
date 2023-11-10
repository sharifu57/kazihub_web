import React from "react";
import { googleLogout } from "@react-oauth/google";

const UserLogout = () => {
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default UserLogout;
