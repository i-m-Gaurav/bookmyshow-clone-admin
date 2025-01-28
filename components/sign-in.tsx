"use client";

import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();

  const handleSignin = async () => {
    try {
      // Ensure session data is available
      if (!session?.user?.email || !session?.user?.name) {
        console.error("Session data is incomplete.");
        return;
      }

      // Send data to the backend
      const response = await axios.post("/api/login", {
        email: session.user.email,
        name: session.user.name,
      });

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleButtonClick = async () => {
    // Initiate Google sign-in
    await signIn("google");
  };

  // Automatically call handleSignin when the session is updated
  useEffect(() => {
    if (status === "authenticated") {
      handleSignin();
    }
  }, [status]);

  return <button onClick={handleButtonClick}>Click here to sign in</button>;
}