"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )
      )}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp('searchText', 'i')      //'i' se case-insensitive search hota hai, matlab ye 'searchText' ko case-insensitive ki tarah treat karega.
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.item.tag) ||
        regex.test(item.prompt)
    )
  }


  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }


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

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )
      }


    </section>
  )
}

export default Feed
