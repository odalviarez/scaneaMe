import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../Logo/LogoQR.png";
import cartImg from "../../Logo/cart.png";
import { useLocalStorage } from "../../useLocalStorage";

export default function Navbar() {
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const [totalItems, setTotalItems] = useState("");

 useEffect(
   () => {
     setTotalItems(cart.length);
   },[cart, totalItems],);

  return (
    <nav className={styles.nav}>
      <Link to={"/home"}>
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <ul>
        <li>
          <div className={styles.itemsCart}>{totalItems}</div>
          <Link to={"/cart"}>
            <img src={cartImg} className={styles.cart} alt="cart" />
          </Link>
        </li>
        <li>
          <Link to={"/catalogue"} className={styles.anchor}>
            Catalogue
          </Link>
        </li>
        <li>
          <Link to={"/profile"} className={styles.anchor}>
            Profile
          </Link>
        </li>
        <li>
          <Link to={"/about"} className={styles.anchor}>
            About us
          </Link>
        </li>
        <li>
          <Link to={"/contact"} className={styles.anchor}>
            Contact
          </Link>
        </li>
        <li>
          <Link to={"/login"} className={styles.anchor}>
            login
          </Link>
        </li>
        <li>
          <Link to={"/register"} className={styles.anchor}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
