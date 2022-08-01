import React, { useState } from "react";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
// import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

export default function Signup() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [showCode, setShowCode] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password, username };
    try {
      // if (showCode) {
      //   confirmSignUp(data);
      // } else {
      console.log("signing up with data: ", data);
      await signUpWithEmailAndPassword(data);
      // setShowCode(true);
      // }
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
      // setOpen(true);
    }
  };

  async function signUpWithEmailAndPassword(data) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log("Signed up a user:", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignUp(data) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Successs, singed in a user", amplifyUser);
      if (amplifyUser) {
        router.push(`/`);
      } else {
        throw new Error("Something went wrong :'(");
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  console.log("The value of the user from the hook is:", user);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <input
            id="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            variant="outlined"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
        </div>

        <div>
          <input
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <button variant="contained" type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
