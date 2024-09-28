import React from 'react'
import { useState } from 'react'
import classes from './CreateUser.module.css'
import { createUser } from '../helpers/auth/createUser'

const CreateUser = ({ setLoading }) => {
  const [newUser, setNewUser] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [newRole, setNewRole] = useState('Customer')
  const [message, setMessage] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!newUser || !newPwd || !newRole) {
      setMessage('All fields are reuired')
    } else {
      try {
        const result = await createUser(newUser, newPwd, newRole)
        if (result.status === 409) {
          // User already exist
          setMessage(result.response.data.message)
        } else if (result.status === 201) {
          // User created
          setMessage(result.data.message)
          setNewPwd('')
          setNewUser('')
          setNewRole('Customer')
        } else {
          setNewPwd('')
          setNewUser('')
          setNewRole('Customer')
          setMessage('Error')
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }
  return (
    <div className={classes.container}>
      <form className={classes.formContainer} onSubmit={handleCreate}>
        <input
          type="text"
          className={classes.input}
          placeholder="Username"
          value={newUser}
          onChange={(e) => setNewUser(() => e.target.value)}
        />
        <input
          type="password"
          className={classes.input}
          placeholder="Password"
          value={newPwd}
          onChange={(e) => setNewPwd(() => e.target.value)}
        />
        <select
          type="text"
          className={classes.input}
          value={newRole}
          onChange={(e) => setNewRole(() => e.target.value)}
        >
          <option value="Admin ">Admin</option>
          <option value="Customer">Customer</option>
        </select>
        <button type="submit" className={classes.newButton}>
          Create
        </button>
        <label>{message}</label>
      </form>
    </div>
  )
}

export default CreateUser
