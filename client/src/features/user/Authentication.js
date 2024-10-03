import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import classes from './Authentication.module.css'
import { handleLogin } from '../../helpers/auth/handleLogin.js'
import { handleLogout } from '../../helpers/auth/handleLogout.js'

const Authentication = ({ setLoading, user, setUser, role, setRole }) => {
  const [pwd, setPwd] = useState('')
  const [login, setLogin] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await handleLogin(login, pwd)
      console.log(result)
      if (result.username && result.role) {
        setUser(result.username)
        setRole(result.role)
        setLogin('')
        setPwd('')
        console.log(pwd, login)
        setLoading(false)
        toast.success(`Welcome ${result.username}`)
      } else if (result.status === 401) {
        console.log('User not found')
        setRole('')
        setMessage('Wrong user or password')
        setLoading(false)
        toast.error(message)
      } else if (result.status === 400) {
        console.log('Both fields are required')
        setRole('')
        setMessage('Both fields are required')
        setLoading(false)
        toast.error(message)
      }
    } catch (error) {
      console.log('error')
      toast.error(error)
      setLoading(false)
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await handleLogout()
      setUser('')
      setRole('')
      toast.success('Goodbye')

      console.log(result)
      setLoading(false)
    } catch (error) {
      toast.error(error)

      console.log('error')
      setLoading(false)
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
              value={login}
              onChange={(e) => setLogin(() => e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              value={pwd}
              onChange={(e) => setPwd(() => e.target.value)}
            />
            <button className={classes.authBtn} type="submit">
              Login
            </button>
          </form>

          <label>{message}</label>
        </div>
      )}
    </div>
  )
}

export default Authentication
