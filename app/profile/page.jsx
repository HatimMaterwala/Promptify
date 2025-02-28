"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '../../components/Profile'
const MyProfile = () => {
  const [posts, setposts] = useState([]);
  const {data: session} = useSession();
  useEffect(()=>{
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    }
    
    if(session?.user.id)fetchPosts(); 
  },[])

  const handleEdit = () => {

  }

  const handleDelete = async () => {
    
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
