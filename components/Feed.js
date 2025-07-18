"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />
      )
      )}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])
  
  


  return (
    <section className='feed'>
      <form className='w-full' action="">
        <input type="text" placeholder='Search for tag, or a username' 
          value={searchText}
          onChange={handleSearchChange}
          required
          className='peer search_input'
        />
      </form>

      <PromptCardList 
        data = {posts}
        handleTagClick = {() => {
          
        }
        }
      />
    </section>
  )
}

export default Feed
