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
          <Link to={'/catalogue'}>Catalogue</Link>
        </li>
        <li>
          <Link to={'/about'}>About us</Link>
        </li>
        <li>
          <Link to={'/contact'}>Contact</Link>
        </li>
        <li>
          <Link to={'/cart'}>Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
