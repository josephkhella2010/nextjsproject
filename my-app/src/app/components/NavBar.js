"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "./Header";
export default function NavBar() {
  const [active, Setactive] = useState(false);
  /*  */
  const [isSticky, setIsSticky] = useState(false);
  /*  */
  function handleHamBar() {
    Setactive((c) => !c);
  }
  let addclass = active ? "active" : "";
  function handleStick() {
    if (window.scrollY > 70) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleStick);
    return () => {
      window.removeEventListener("scroll", handleStick);
    };
  }, []);
  let addStickyClass = isSticky ? "sticky" : "";

  return (
    <nav className={addStickyClass}>
      <div className="logo">
        <h1>Libraby</h1>
      </div>
      <div className="line-container" onClick={handleHamBar}>
        <div className={`${addclass} line`}></div>
        <div className={`${addclass} line`}></div>
        <div className={`${addclass} line`}></div>
      </div>
      <ul className={`${addclass}`}>
        <Link
          href={"/"}
          className="li"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </Link>
        <Link
          href={"/items"}
          className="li"
          onClick={() => (window.location.href = "/items")}
        >
          Items List
        </Link>
        {/* <Link href={"/login"} className="li">
          Log in or Sign Up
        </Link> */}
        <Header />
      </ul>
    </nav>
  );
}
