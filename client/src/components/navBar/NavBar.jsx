import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../../Logos/LogoQR.png'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to={'/home/'}>
        <img src={logo} className={styles.logo}/>
      </Link>
    </nav>
  )
}
