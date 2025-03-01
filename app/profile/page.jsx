"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '../../components/Profile'
const MyProfile = () => {
  const [posts, setposts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(()=>{
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const receivedData = await response.json();
      setposts(receivedData);
    }
    
    if(session?.user.id) fetchPosts(); 
  },[session?.user.id ])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`); 
  }

  const handleDelete = async (post) => {
    const isConfirm = confirm(`Are you sure you want to delete this post?`);
    if(isConfirm) {
      try{
        await fetch(`api/prompt/${post._id.toString()}`,{method:'DELETE'});
        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setposts(filteredPosts);
      }
      catch(err){
        console.error(err);
      }
      
    }

  }

  return (
    <Profile
    name="My"
    desc="Welcome to your profile!!"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  ) 
}

export default MyProfile
