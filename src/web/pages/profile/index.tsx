// Profile.js

import React, { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  token: string;
  user: {
    id: string
    firstName: string,
    lastName: string,
    email: string
  }
  // Add other properties as needed
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userObj"); 

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        // console.log("Parsed user data:", parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <p>ID: {user?.user?.id}</p>
          <p>Email: {user.user?.email}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}
