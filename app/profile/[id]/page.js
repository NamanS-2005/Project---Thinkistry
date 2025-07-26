"use client"

import React from "react"
// import React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@/components/Profile"

const UserProfile = ({params}) => {
  const searchParams = useSearchParams()
  const paramss = React.use(params)
  const userName = searchParams.get('name')

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${paramss?.id}/posts`)
      const data = await response.json()

      setUserPosts(data)
    }

    if(paramss?.id) fetchPosts()
 
  }, [paramss.id])
  

  return (
    <Profile 
        name = {userName}
        desc = {`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.}`}
        data = {userPosts}
    />
  )

}


export default UserProfile;