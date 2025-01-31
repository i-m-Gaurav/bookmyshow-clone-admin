"use client";

import { signIn} from "next-auth/react";


export default function SignIn() {

  const handleButtonClick = async () => {
    // Initiate Google sign-in
    await signIn("google");
  };

  return <button onClick={handleButtonClick}>Click here to sign in</button>;
}