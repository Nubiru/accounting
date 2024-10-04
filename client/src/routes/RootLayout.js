import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.js'
import Header from '../components/header/Header.js'

const RootLayout = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
