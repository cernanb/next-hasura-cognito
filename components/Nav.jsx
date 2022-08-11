import Link from "next/link";
import { Auth } from "aws-amplify";
import { useUser } from "../context/AuthContext";

const Nav = () => {
  const { user } = useUser();
  return (
    <ul>
      <li>
        <Link href={"/"} passHref>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href={"/kits"}>
          <a>Kits</a>
        </Link>
      </li>
      <li>
        {user ? (
          <button onClick={() => Auth.signOut()}>Sign out</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Nav;
