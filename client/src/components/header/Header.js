import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { FaHome } from 'react-icons/fa'

import { FaAddressBook, FaCircleInfo, FaEnvelope } from 'react-icons/fa6'

const Header = ({ tab }) => {
  console.log(tab)

  return (
    <>
      {/* purple bar 100vw */}
      <div className={classes.navContainer} />

      {/* Always visible no condition Home Navigation 30vw left side */}
      <div className={classes.mainNav}>
        <ul className={classes.list}>
          <li className={classes.element}>
            <FaHome />
            <p className={classes.label}>Home</p>
          </li>
          <li className={classes.element}>
            <FaAddressBook />
            <p className={classes.label}>Contact</p>
          </li>
          <li className={classes.element}>
            <FaCircleInfo />
            <p className={classes.label}>About</p>
          </li>
        </ul>
      </div>

      {/* Admin logged in, App navigation, 65vw center */}

      <div className={classes.appNav}>
        <ul className={classes.list}>
          <Link to="create-post" className={classes.element}>
            <FaEnvelope />
            <p className={classes.label}>Create Post</p>
          </Link>
        </ul>
      </div>
    </>
  )
}

export default Header
