"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const Router = useRouter();
  const [providers, setProviders] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const getProvidersList = async () => {
      const providersList = await getProviders();
      setProviders(providersList);
    };

    getProvidersList();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)){
        ref.current.style.display = "none";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavbar = () => {
    if (ref.current.style.display === "inline") {
      ref.current.style.display = "none";
    } else {
      ref.current.style.display = "inline";
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage after sign-out
    ref.current.style.display = "none";
  };

  return (
    <nav
      className="z-10 m-auto sticky top-4 mt-4 w-[90vw] flex rounded-md justify-between
     px-6 items-center h-16 shadow-sm font-mono border border-r-4 border-b-4 border-black"
    >
      <div className="logo">
        <Link className="flex justify-center items-center" href={"/"}>
          <Image
            className=""
            src={"/logo.png"}
            alt="Logo"
            width={50}
            height={50}
          />
          <p className="text-4xl opacity-25 ">Promptify</p>
        </Link>
      </div>
      {session?.user ? (
        <div className="relative buttons space-x-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="hidden md:inline bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black"
          >
            Sign Out
          </button>
          <Link href={"/create"}>
            <button className="hidden md:inline bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black">
              Create Prompt
            </button>
          </Link>
          <Link href={`/champs/${session?.user.id}`}>
            <Image
              className="hidden md:inline bg-blend-screen rounded-full"
              src={session?.user.image}
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
          <Image
            onClick={handleNavbar}
            className="cursor-pointer inline md:hidden bg-blend-screen rounded-full"
            src={session?.user.image}
            alt="Logo"
            width={40}
            height={40}
          />
          <div
            ref={ref}
            className="hidden absolute right-9 top-9 rounded-l-lg rounded-b-lg bg-slate-50"
          >
            <Link href={`/champs/${session?.user.id}`}>
              <div
                onClick={() => {
                  ref.current.style.display = "none";
                }}
                className="hover:bg-slate-200 rounded-l-lg rounded-bl-none cursor-pointer profile block md:hidden p-1 px-3 border-b-2"
              >
                Profile
              </div>
            </Link>
            <Link href={"/create"}>
              <div
                onClick={() => {
                  ref.current.style.display = "none";
                }}
                className="hover:bg-slate-200  text-nowrap cursor-pointer create-prompt block md:hidden p-1 px-3 border-b-2"
              >
                Create Prompt
              </div>
            </Link>
            <div
              onClick={handleSignOut}
              className="hover:bg-slate-200 text-nowrap cursor-pointer signOut block md:hidden p-1 px-3 "
            >
              Sign Out
            </div>
          </div>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  );
};

export default Navbar;
