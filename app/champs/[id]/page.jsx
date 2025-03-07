"use client";
import { use } from "react";
import Profile from "@/components/Profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (id) fetchUserPosts();
  }, [id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`); 
  }

  const handleDelete = async (post) => {
    const isConfirm = confirm(`Are you sure you want to delete this post?`);
    if(isConfirm) {
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{method:'DELETE'});
        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPosts(filteredPosts);
      }
      catch(err){
        console.error(err);
      } 
      
    }

  }

  return (
    <>
      {(id === session?.user.id) ? (
        <Profile
          name="My"
          desc={`Welcome to this your profile`}
          data={posts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <Profile
          name={`User's`}
          desc={`Welcome to this user's profile`}
          data={posts}
        />
      )}
    </>
  );
};

export default UserProfile;
