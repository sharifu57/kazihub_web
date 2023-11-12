import React from "react";

export default function getUSer() {
  const storedUser = localStorage.getItem("user") || "";
  const storedProfile = localStorage.getItem("profile") || "";
  const token  =localStorage.getItem("token") || "";

  try {
    let user = JSON.parse(storedUser);
    let profile = JSON.parse(storedProfile);
    if (user && profile && token) {
      return { user, profile, token };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
