import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Home() {
  const { data, loading } = useSession();
  useEffect(() => {
    async function session() {
      const session = await getSession();
      console.log(session);
    }
  });
  if (loading && !data) return <p>Loading...</p>;
  console.log(data);
  if (data) {
    return (
      <>
        Signed in
        <br />
        <button onClick={() => signOut("cognito")}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("cognito")}>Sign in with Cognito</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/kits",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
