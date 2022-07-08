import Link from "next/link";
import { signOut } from "next-auth/react";

const Nav = () => {
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
        <button onClick={() => signOut("cognito")}>Sign out</button>
      </li>
    </ul>
  );
};

export default Nav;
