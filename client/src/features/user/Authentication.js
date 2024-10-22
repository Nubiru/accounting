import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import classes from './Authentication.module.css'
import { handleLogin } from '../../helpers/auth/handleLogin.js'
import { handleLogout } from '../../helpers/auth/handleLogout.js'
import { useNavigate } from 'react-router-dom'
const Authentication = ({ onLogin, user, setUser, role, setRole }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await handleLogin(username, password)
      console.log('***handlelogin***', result)

      if (result.username && result.role) {
        setUser(result.username)
        setRole(result.role)
        setUsername('')
        setPassword('')

        if (result.role === 'Admin') {
          localStorage.setItem('customerFolder', '')
        } else {
          localStorage.setItem('customerFolder', result.username)
        }
        toast.success(`Welcome ${result.username}`)
        onLogin(result)
      } else if (result.status === 401) {
        console.log('User not found')
        setRole('')
        setMessage('Wrong user or password')

        toast.error(message)
      } else if (result.status === 400) {
        console.log('Both fields are required')
        setRole('')
        setMessage('Both fields are required')

        toast.error(message)
      }
    } catch (error) {
      console.log('error')
      toast.error(error)
    }
  }

  const logout = async (e) => {
    e.preventDefault()

    try {
      const result = await handleLogout()
      setUser('')
      setRole('')
      toast.success('Goodbye')
      navigate('/')
      console.log(result)
      localStorage.setItem('customerFolder', '')
      localStorage.setItem('subFolder', '')
    } catch (error) {
      toast.error(error)

      console.log('error')
    }
  }

  return (
    <div className={classes.authContainer}>
      {user ? (
        <ul className={classes.list}>
          <li className={classes.element}>
            <p className={classes.label}>{user}</p>
          </li>
          <button className={classes.authBtn} onClick={(e) => logout(e)}>
            Logout
          </button>
        </ul>
      ) : (
        <div>
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              required
              value={username}
              onChange={(e) => setUsername(() => e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
            <button className={classes.authBtn} type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authentication
