import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useUser } from "../context/AuthContext";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <h1>Home</h1>
      {user ? (
        <div>You are logged in as {user.attributes.email}</div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
}
