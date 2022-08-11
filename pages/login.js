import React, { useState } from "react";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signInError, setSignInError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(username, password);
      router.push(`/`);
    } catch (error) {
      console.error(error);
      setSignInError(error.message);
      setOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        <div>
          <div>
            <input
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <button type="submit">Sign In</button>
          </div>
        </div>
      </form>
    </>
  );
}
