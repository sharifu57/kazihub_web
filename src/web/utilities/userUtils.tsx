import React from "react";


interface User {
  id: string
}
export default function getUSer() {
  const storedUser = localStorage.getItem("userObj");

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser) as User;
      return user;
    } catch (error) {
      console.log("Error parsing data", error);
    }
  }
}
