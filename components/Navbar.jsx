"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <nav
      className="z-10 m-auto sticky top-4 w-[90vw] flex rounded-md justify-between
     px-6 items-center h-16 shadow-sm font-mono border border-r-4 border-b-4 border-black"
    >
      <div className="logo">
        <Image
          className="bg-blend-screen"
          src={"/logo.png"}
          alt="Logo"
          width={50}
          height={50}
        />
      </div>
      {isLogged ? (
        <div className="buttons space-x-4">
          <button className="bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black">
            Sign Out
          </button>
          <button className="bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black">
            Create Prompt
          </button>
          <Image
            className="bg-blend-screen inline"
            src={"/logo.png"}
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <>
          <button className="bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black">
            Sign In
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
