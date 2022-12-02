import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../Logo/LogoQR.png";
import cartImg from "../../Logo/cart.png";
//import profile from "../../Logo/profile.png";
import { useLocalStorage } from "../../useLocalStorage";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Container,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {getUserLogin, getTotalProducts} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {


  const dispatch = useDispatch();
  const [cart, setCart] = useLocalStorage("cartProducts", []);

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {

    if (cart) dispatch(getTotalProducts(cart.length));
    if (user) dispatch(getUserLogin(user.email, user));
    
  }, [cart, dispatch, user]);

  const totalItems = useSelector((state) => state.totalProducts);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin + "/home",
    });

  return (
    <nav className={styles.nav}>
      <Link to={"/home"}>
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <Container className={styles.desplegable}>
        <NavbarToggler onClick={toggle} />
        <Nav className="d-none d-md-block" navbar>
          {!isAuthenticated && (
            <NavItem>
              <Button
                id="qsLoginBtn"
                color="primary"
                className="btn-margin"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </Button>
            </NavItem>
          )}
          {isAuthenticated && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret id="profileDropDown">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="nav-user-profile rounded-circle"
                  width="50"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>{user.name}</DropdownItem>
                <DropdownItem
                  tag={RouterNavLink}
                  to="/user/account"
                  className="dropdown-profile"
                  activeclassname="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="tools" className="mr-3" /> Account
                </DropdownItem>
                <DropdownItem
                  tag={RouterNavLink}
                  to="/profile"
                  className="dropdown-profile"
                  activeclassname="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                </DropdownItem>
                <DropdownItem
                  id="qsLogoutBtn"
                  onClick={() => logoutWithRedirect()}
                >
                  <FontAwesomeIcon icon="power-off" className="mr-3" /> Log out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
        {!isAuthenticated && (
          <Nav className="d-md-none" navbar>
            <NavItem>
              <Button
                id="qsLoginBtn"
                color="primary"
                block
                onClick={() => loginWithRedirect({})}
              >
                Log in
              </Button>
            </NavItem>
          </Nav>
        )}
        {isAuthenticated && (
          <Nav
            className="d-md-none justify-content-between"
            navbar
            style={{ minHeight: 170 }}
          >
            <NavItem>
              <span className="user-info">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="nav-user-profile d-inline-block rounded-circle mr-3"
                  width="50"
                />
                <h6 className="d-inline-block">{user.name}</h6>
              </span>
            </NavItem>
            <NavItem>
            <FontAwesomeIcon icon="tools" className="mr-3" />
              <RouterNavLink
                to="/user/account"
                activeclassname="router-link-exact-active"
              >
                Account
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <FontAwesomeIcon icon="user" className="mr-3" />
              <RouterNavLink
                to="/profile"
                activeclassname="router-link-exact-active"
              >
                Profile
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <FontAwesomeIcon icon="power-off" className="mr-3" />
              <RouterNavLink
                to="#"
                id="qsLogoutBtn"
                onClick={() => logoutWithRedirect()}
              >
                Log out
              </RouterNavLink>
            </NavItem>
          </Nav>
        )}
      </Container>
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
          <Link to={"/about"} className={styles.anchor}>
            About us
          </Link>
        </li>
        <li>
          <Link to={"/contact"} className={styles.anchor}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
