import React from 'react'
import classes from './Nav.module.css'
import { FaHome } from 'react-icons/fa'

import Authentication from '../features/user/Authentication.js'

import {
  FaAddressBook,
  FaBell,
  FaCircleInfo,
  FaEnvelope,
  FaFolderOpen,
  FaUpload,
  FaUser,
  FaUsers
} from 'react-icons/fa6'

//controls of show / hide

const Nav = ({
  onCreatePost,
  setLoading,
  tab,
  setTab,
  user,
  setUser,
  role,
  setRole,
  shUp,
  setShUp,
  shNv,
  setShNv,
  shPst,
  setShPst,
  shNws,
  setShNws,
  showCustomers,
  setShowCustomers,
  shCrtUsr,
  setShCrtUsr,
  shCrtPst,
  setShCrtPst,
  shCrtNws,
  setShCrtNws
}) => {
  console.log(tab)
  const handleDisplay = (newTab) => {
    //Default view
    if (newTab === 'Default') {
      setShPst(true)
      setShNws(true)

      setShNv(false)
      setShUp(false)
      setShCrtPst(false)
      setShCrtNws(false)
      setShCrtUsr(false)
      setShowCustomers(false)

      setTab(newTab)
    }

    //Customers
    if (newTab === 'Customers') {
      if (tab === 'Customers') {
        setShCrtUsr(false)
        setShowCustomers(false)
        setTab('Default')
      } else if (tab !== 'Customers') {
        setShowCustomers(true)
        setShPst(false)
        setShNws(false)
        setShNv(false)
        setShUp(false)
        setTab(newTab)
      }
    }

    //File related
    if (newTab === 'Folders') {
      if (tab === 'Folders') {
        setShNv(false)
        setTab('Default')
      } else {
        setShNv(true)

        setShPst(false)
        setShNws(false)
        setShCrtPst(false)
        setShCrtNws(false)
        setShCrtUsr(false)
        setShowCustomers(false)

        setTab(newTab)
      }
    }

    if (newTab === 'Upload') {
      if (tab === 'Upload') {
        setShUp(false)
        setTab('Default')
      } else {
        setShUp(true)

        setShPst(false)
        setShNws(false)
        setShCrtPst(false)
        setShCrtNws(false)
        setShCrtUsr(false)
        setShowCustomers(false)

        setTab(newTab)
      }
    }

    //show create user
    if (newTab === 'User') {
      if (tab === 'User') {
        setShCrtUsr(false)
        setTab('Default')
      } else {
        setShCrtUsr(true)

        setShNv(false)
        setShUp(false)
        setShPst(false)
        setShNws(false)
        setShCrtPst(false)
        setShCrtNws(false)

        setTab(newTab)
      }
    }
    // show news / posts

    if (newTab === 'Posts') {
      if (shCrtPst) {
        setShCrtPst(false)
      }
      if (tab === 'Default') {
        setShCrtPst(true)
      } else {
        setTab('Default')
        setShCrtPst(true)
        setShNv(false)
        setShUp(false)
        setShPst(false)
        setShNws(false)
        setShCrtUsr(false)
        setShowCustomers(false)
      }
    }

    if (newTab === 'News') {
      if (shCrtNws) {
        setShCrtNws(false)
      }
      if (tab === 'Default') {
        setShCrtNws(true)
      } else {
        setTab('Default')
        setShCrtNws(true)
        setShNv(false)
        setShUp(false)
        setShPst(false)
        setShNws(false)
        setShCrtUsr(false)
        setShowCustomers(false)
      }
    }
  }

  return (
    <>
      {/* purple bar 100vw */}
      <div className={classes.navContainer} />

      {/* Always visible no condition Home Navigation 30vw left side */}
      <div className={classes.mainNav}>
        <ul className={classes.list}>
          <li
            className={classes.element}
            onClick={() => handleDisplay('Default')}
          >
            <FaHome />
            <p className={classes.label}>Home</p>
          </li>
          <li
            className={classes.element}
            onClick={() => handleDisplay('Contact')}
          >
            <FaAddressBook />
            <p className={classes.label}>Contact</p>
          </li>
          <li
            className={classes.element}
            onClick={() => handleDisplay('About')}
          >
            <FaCircleInfo />
            <p className={classes.label}>About</p>
          </li>
        </ul>
      </div>

      {/* Admin logged in, App navigation, 65vw center */}

      {role.includes('Admin') && (
        <div className={classes.appNav}>
          <ul className={classes.list}>
            <li
              className={classes.element}
              onClick={() => handleDisplay('Customers')}
            >
              <FaUsers />
              <p className={classes.label}>Customers</p>
            </li>

            <li
              className={classes.element}
              onClick={() => handleDisplay('User')}
            >
              <FaUser />
              <p className={classes.label}>Create User</p>
            </li>

            <li className={classes.element} onClick={onCreatePost}>
              <FaEnvelope />
              <p className={classes.label}>Create Post</p>
            </li>

            <li
              className={classes.element}
              onClick={() => handleDisplay('News')}
            >
              <FaBell />
              <p className={classes.label}>Create News</p>
            </li>

            <li
              className={classes.element}
              onClick={() => handleDisplay('Upload')}
            >
              <FaUpload />
              <p className={classes.label}>Upload a File</p>
            </li>

            <li
              className={classes.element}
              onClick={() => handleDisplay('Folders')}
            >
              <FaFolderOpen />
              <p className={classes.label}>Navigate Files</p>
            </li>
          </ul>
        </div>
      )}

      {/* Customer logged in, App navigation, 65vw center */}

      {role.includes('Customer') && (
        <div className={classes.appNav}>
          <ul className={classes.list}>
            <li className={classes.element} onClick={() => setShUp(!shUp)}>
              <FaUpload />
              <p className={classes.label}>Upload a File</p>
            </li>

            <li className={classes.element} onClick={() => setShNv(!shNv)}>
              <FaFolderOpen />
              <p className={classes.label}>Navigate Files</p>
            </li>
          </ul>
        </div>
      )}

      {/* state dependant display -> Login / logout , 15rem right side, styles in Authentication */}

      <Authentication
        setLoading={setLoading}
        user={user}
        setUser={setUser}
        role={role}
        setRole={setRole}
      />
    </>
  )
}

export default Nav
