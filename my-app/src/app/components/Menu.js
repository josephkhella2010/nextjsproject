"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "./Header";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu when the hamburger icon is clicked
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //////////////////////////////////
  const [isSticky, setIsSticky] = useState(false);

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
  let addactive = isOpen ? "bar open" : "bar";
  return (
    <>
      <nav className={` navbar ${addStickyClass}`}>
        <div className="logo">
          <h1>Libraby</h1>
        </div>
        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`${addactive}`}></div>
          <div className={`${addactive}`}></div>
          <div className={`${addactive}`}></div>
        </div>

        {/* Navigation menu with opacity */}
        <ul className={isOpen ? "nav-menu open" : "nav-menu"}>
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

          <Header />
        </ul>
      </nav>
    </>
  );
}
