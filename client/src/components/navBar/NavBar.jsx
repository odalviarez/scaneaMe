import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../Logo/LogoQR.png'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to={'/home'}>
        <img src={logo} className={styles.logo} alt='logo' />
      </Link>
      <ul>
        <li>
          <Link to={'/catalogue'} className={styles.anchor}>Catalogue</Link>
        </li>
        <li>
          <Link to={'/about'} className={styles.anchor}>About us</Link>
        </li>
        <li>
          <Link to={'/contact'} className={styles.anchor}>Contact</Link>
        </li>
        <li>
          <Link to={'/cart'}>Cart</Link>
        </li>
        <li>
          <Link to={'/login'}>login</Link>
        </li>
        <li>
          <Link to={'/register'}>Register</Link>
        </li>
      </ul>
    </nav>
  )
}
