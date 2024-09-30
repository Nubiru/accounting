import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import classes from './Customers.module.css'
import { removeUser, getAllUsers, getUser } from '../../helpers/usersHelper.js'

const Customers = ({ setLoading }) => {
  const [users, setUsers] = useState([])
  const [rawUsers, setRawUsers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (rawUsers.length > 0) {
      const rawUsersMap = rawUsers.map((rawUser, index) => {
        const id = rawUser._id
        return (
          <div key={index}>
            <h2>{rawUser.usernme}</h2>
            <h3>{rawUser.date}</h3>
            <h3>{rawUser.updated}</h3>
            <button
              className={classes.newButton}
              onClick={(e) => handleRemoveUser(e, id)}
            >
              Remove
            </button>
          </div>
        )
      })
      setUsers(rawUsersMap)
    }
    console.log(users)
  }, [rawUsers])

  const fetchData = async () => {
    setLoading(true)
    const promise = Promise.resolve(getAllUsers())
    promise.then((value) => {
      console.log(value)
      setRawUsers(value)
    })
    setLoading(false)
  }

  const handleRemoveUser = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await removeUser(id)
      console.log(result)
      toast.success('User Removed')
    } catch (error) {
      toast.error(error)
    }
    fetchData()
    setLoading(false)
  }

  return (
    <>
      <div className={classes.container}>
        <label className={classes.label} for="search">
          Search by id:
        </label>
        <input
          className={classes.label}
          type="search"
          id="search"
          placeholder="User id..."
        />
      </div>

      <div className={classes.container}>{users}</div>
    </>
  )
}

export default Customers
