import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../Logo/LogoQR.png'
import cart from '../../Logo/cart.png'
import profile from '../../Logo/profile.png'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to={'/home'}>
        <img src={logo} className={styles.logo} alt='logo' />
      </Link>
      <ul>
        <li>
          <Link to={'/cart'}>
            <img src={cart} className={styles.cart} alt='cart' />
          </Link>
        </li>
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
          <Link to={'/login'} className={styles.anchor}>login</Link>
        </li>
        <li>
          <Link to={'/register'} className={styles.anchor}>Register</Link>
        </li>
      </ul>
    </nav>
  )
}
