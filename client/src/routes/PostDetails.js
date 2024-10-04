import axios from 'axios'
import { useLoaderData, Link, Form, redirect } from 'react-router-dom'
import toast from 'react-hot-toast'

import Modal from '../components/Modal'
import classes from './PostDetails.module.css'
import { getPost } from '../helpers/posts/getPosts'
import { useState } from 'react'

function PostDetails() {
  const post = useLoaderData()
  const [editing, setEditing] = useState(false)

  const { title, content } = post

  console.dir(post)
  if (!post) {
    return (
      // Post not found display
      <Modal>
        <main className={classes.details}>
          <h2 className={classes.content}>Could not find post</h2>
          <p className={classes.content}>
            Unfortunately, the requested post could not be found.
          </p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    )
  }
  return (
    <>
      {/* Edit post */}
      {editing && (
        <Modal>
          <Form method="post" className={classes.form}>
            <p>
              <label htmlFor="title">Post Title</label>
              <input
                defaultValue={title}
                name="title"
                type="text"
                id="title"
                required
              />
            </p>

            <p>
              <label htmlFor="content">Content</label>
              <textarea
                defaultValue={content}
                name="content"
                id="content"
                required
                rows={7}
              />
            </p>

            <p className={classes.actions}>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                }}
              >
                Cancel
              </button>
              <button>Update Post</button>
              {/* <Link to={id}>Update Post</Link> */}
            </p>
          </Form>
        </Modal>
      )}

      {/* View post */}
      {!editing && (
        <Modal>
          <main className={classes.details}>
            <h3 className={classes.title}>{post.title}</h3>
            <p className={classes.content}>{post.content}</p>
          </main>
          <div className={classes.actions}>
            <button>Delete Post</button>
            <button
              onClick={() => {
                setEditing(true)
              }}
            >
              Edit Post
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default PostDetails

export const loader = async ({ params }) => {
  console.log(1, params.id)
  const post = await getPost(params.id)
  return post
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()

  const title = formData.get('title')
  console.log(1, title)
  const content = formData.get('content')
  console.log(2, content)

  console.log(3, params.id)
  const id = params.id

  const postData = Object.fromEntries(formData)

  try {
    console.log(5, 'e')
    //I GOT UP TO HERE, following this line there is internal server error 500, probably the patch url or backend code
    await axios.patch(`http://localhost:3500/posts/edit/${id}`, {
      title: postData.title,
      content: postData.content
    })
    console.log(6, 'e')
  } catch (error) {
    console.log(Error)
  }

  return redirect('/')
}
