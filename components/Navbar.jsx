"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const {data:session} = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getProvidersList = async () => {
      const providersList = await getProviders();
      setProviders(providersList);
    };

    getProvidersList();
  }, []);

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
        <div className="buttons space-x-4">
          <button
            type="button" 
            onClick={() => signOut()}
            className="hidden sm:inline bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black"
          >
            Sign Out
          </button>
          <Link href={"/create"}>
            <button className="hidden sm:inline bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black">
              Create Prompt
            </button>
          </Link>
          <Link href={`/champs/${session?.user.id}`}>
            <Image
              className="bg-blend-screen inline rounded-full"
              src={session?.user.image}
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
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
