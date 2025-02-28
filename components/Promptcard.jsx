"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const handleToast = () => {
    toast.success("Prompt copied to clipboard!");
};
const Promptcard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied,setcopied] = useState(false);
  return (
    <div className="prompt_card rounded-lg bg-white w-1/3 p-2 shadow-sm border border-r-4 border-b-4 border-black">
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <div>
            <Image
              src={post.creator.image}
              alt={post.creator.username}
              width={40}
              height={35}
              className="cursor-pointer rounded-full object-contain border border-white"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold">{post.creator.username}</h2>
            <p className="opacity-50">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy px-5">
          <Image
            src={!copied ? "./copy.svg" : "./copied.svg"}
            width={20}
            height={20}
            alt="copy"
            className="cursor-pointer hover:transform hover:scale-110"
            onClick={async () => {
              await navigator.clipboard.writeText(post.prompt);
              setcopied(true);
              handleToast();
              setTimeout(() => setcopied(false), 3000);
            }}
          />
        </div>
      </div>
      <div className="px-1 my-1 flex flex-col gap-3">
        <p className="p-2  rounded-lg font-serif">{post.prompt}</p>
        <p className="bg-black text-white font-mono rounded-lg p-1 px-3 cursor-pointer">
          {post.tag}
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Promptcard;
