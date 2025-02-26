"use client";
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation "
import Form from "@components/Form"
const create = () => {

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = (e) => {

  }
  
  return (
      <Form 

      />
  )
}

export default create
