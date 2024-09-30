import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import classes from './ViewPosts.module.css'
import { getPosts } from '../../helpers/posts/getPosts.js'
import { deletePost } from '../../helpers/posts/deletePost.js'

const ViewPosts = ({ setLoading }) => {
  const [posts, setPosts] = useState([])
  const [rawPosts, setRawPosts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (rawPosts.length > 0) {
      const rawPostsMap = rawPosts.map((rawPost, index) => {
        const id = rawPost._id
        return (
          <div key={index}>
            <h2>{rawPost.title}</h2>
            <h3>{rawPost.content}</h3>
            <h3>{rawPost.updated}</h3>
            <button
              className={classes.newButton}
              onClick={(e) => handleDeletePost(e, id)}
            >
              Delete
            </button>
          </div>
        )
      })
      setPosts(rawPostsMap)
    }
    console.log(posts)
  }, [rawPosts])

  const fetchData = async () => {
    setLoading(true)
    const promise = Promise.resolve(getPosts())
    promise.then((value) => {
      console.log(value)
      setRawPosts(value)
    })
    setLoading(false)
  }

  const handleDeletePost = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await deletePost(id)
      console.log(result)
      toast.success('Post Deleted')
    } catch (error) {
      toast.error(error)
    }
    fetchData()
    setLoading(false)
  }

  return <div className={classes.container}>{posts}</div>
}

export default ViewPosts
