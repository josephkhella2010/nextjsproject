"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <>
      {auth.token && (
        <Link href={"/"} onClick={auth.logout} className="li">
          Logout
        </Link>
      )}
      {!auth.token && (
        <Link
          href={"/"}
          onClick={() => (window.location.href = "/login")}
          className="li"
        >
          Login
        </Link>
      )}
    </>
  );
}
export default Header;
