"use client";
import { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const handleToast = () => {
    toast.success("Prompt copied to clipboard!");
};

const Promptcard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const {data: session} = useSession(); 
  const [copied,setcopied] = useState(false);
  const Router = useRouter();
  const pathName = usePathname();
  return (
    <div className="prompt_card rounded-lg m-auto bg-white w-[90%] p-2 shadow-sm border border-r-4 border-b-4 border-black">
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <div>
            {// Create a clickable Profile Image which will redirect to the Profile of that Person}
            <Image
              src={post.creator?.image || '/default.jpg'}
              alt="user_image"
              width={40}
              height={40}
              className="cursor-pointer rounded-full object-contain border border-white"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold">{post.creator?.username}</h2>
            <p className="opacity-50">{post.creator?.email}</p>
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
      {session?.user.id === post.creator?._id && pathName =='/profile' && 
        <div className="flex justify-end gap-4 p-2">
          <button className="bg-blue-500 text-white rounded-lg p-2 px-4" onClick={handleEdit}>Edit</button>
          <button className="bg-red-500 text-white rounded-lg p-2 px-4" onClick={handleDelete}>Delete</button>
        </div>
      }
      <ToastContainer/>
    </div>
  );
};

export default Promptcard;
