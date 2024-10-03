import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import classes from './PostsList.module.css'
import Modal from '../../components/Modal.js'
import Loader from '../../components/Loader.js'

import { getPosts } from '../../helpers/posts/getPosts.js'
import Post from './Post.js'
import NewPost from './NewPost.js'

const PostsList = ({ isPosting, onStopPosting }) => {
  const [posts, setPosts] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const addPostHandler = (postData) => {
    setPosts((existingPosts) => [postData, ...existingPosts])
  }

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true)
      const response = await getPosts()
      setPosts(response)
      setIsFetching(false)
    }
    fetch()
  }, [])

  return (
    <>
      {/* create post opens over everything else */}
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}

      {/* if not fetching and we have posts */}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          <h1>Posts</h1>
          {posts.map((post, i) => (
            <Post key={i} title={post.title} content={post.content} />
          ))}
        </ul>
      )}

      {/* if not fetching and no posts */}
      {!isFetching && posts.length === 0 && (
        <p className={classes.post}>There are no posts yet</p>
      )}

      {isFetching && <Loader />}
    </>
  )
}

export default PostsList

/*

  const fetchData = async () => {
    setLoading(true)
    const promise = Promise.resolve(getPosts())
    promise.then((value) => {
      console.log(value)
      setPosts(value)
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

  const [rawPosts, setRawPosts] = useState([])
  const [editing, setEditing] = useState(false)



useEffect(() => {
  if (rawPosts.length >= 0) {
    const rawPostsMap = rawPosts.map((rawPost, index) => {
      const id = rawPost._id
      return (
        <div className={classes.post} key={index}>
          <>
            <h2>{rawPost.title}</h2>
            <h3>{rawPost.content}</h3>
            <h3>{rawPost.updated}</h3>

            {role === 'Admin' ? (
              <>
                <button
                  className={classes.newButton}
                  onClick={(e) => handleDeletePost(e, id)}
                >
                  Delete
                </button>
                <button
                  className={classes.newButton}
                  onClick={(e) => handleEditPost(e, id)}
                >
                  Edit
                </button>
              </>
            ) : (
              ''
            )}
          </>
        </div>
      )
    })
    setPosts(rawPostsMap)
  }
  console.log(posts)
}, [rawPosts])

useEffect(() => {
    fetchData()
  }, [loading, role, editing])


  */