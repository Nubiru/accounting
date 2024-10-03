import { useState } from 'react'
import classes from './NewPost.module.css'
import { createPost } from '../../helpers/posts/createPost'

const NewPost = ({ onCancel, onAddPost }) => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredContent, setEnteredContent] = useState('')

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
  }

  const contentChangeHandler = (event) => {
    setEnteredContent(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const postData = {
      title: enteredTitle,
      content: enteredContent
    }
    createPost(postData.title, postData.content)
    onAddPost(postData)
    onCancel()
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required onChange={titleChangeHandler} />
      </p>

      <p>
        <label htmlFor="content">Text</label>
        <textarea
          id="content"
          required
          rows={3}
          onChange={contentChangeHandler}
        />
      </p>

      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  )
}

export default NewPost
