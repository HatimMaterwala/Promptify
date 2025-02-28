"use client"
import { useState, useEffect } from "react"
import Promptcard from "./Promptcard";

const PromptcardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 flex gap-8">
            {data.map((post)=>{
                return <Promptcard 
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                />
            })}
        </div>
    )
}
const Feed = () => {
    const [posts, setposts] = useState([])
    useEffect(()=>{
        const fetchPosts = async ()=> {
            const response = await fetch(`/api/prompt`);
            const data = await response.json();
            setposts(data);
        }
        fetchPosts()
    },[])
  return (
    <section className="feed">
      <PromptcardList
      data={posts}
      handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed
