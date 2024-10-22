import { Toaster } from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.js'
import Header from '../components/header/Header.js'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext.js'

const RootLayout = () => {
  const navigate = useNavigate()
  const { login } = useSession()

  const LoginHandler = (userData) => {
    console.log('**8throughsession8', userData)
    login(userData)
  }
  // const [user, setUser] = useState("");
  // const [role, setRole] = useState("");
  // const roleChangeHandler = (role) => setRole(role);
  // const adminChangeHandler = (user) => setUser(user);
  const [user, setUser] = useState(localStorage.getItem('user') || '')
  const [role, setRole] = useState(localStorage.getItem('role') || '')

  const roleChangeHandler = (role) => {
    setRole(role)
    localStorage.setItem('role', role)
  }

  const adminChangeHandler = (user) => {
    setUser(user)
    localStorage.setItem('user', user)
  }
  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [])
  return (
    <>
      <Toaster />
      <Header
        onLogin={LoginHandler}
        user={user}
        setRole={roleChangeHandler}
        setUser={adminChangeHandler}
        role={role}
      />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
export const loader = async () => {
  const user = localStorage.getItem('user')
  const role = localStorage.getItem('role')

  return { user, role }
}
