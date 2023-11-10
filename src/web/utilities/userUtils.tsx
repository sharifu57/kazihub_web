import React from "react";

export default function getUSer() {
  const storedUser = localStorage.getItem("user") || "";
  const storedProfile = localStorage.getItem("profile") || "";

  try {
    let user = JSON.parse(storedUser);
    let profile = JSON.parse(storedProfile);
    if (user && profile) {
      return { user, profile };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
