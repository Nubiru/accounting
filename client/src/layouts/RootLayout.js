import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.js'

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  )
}

export default RootLayout
