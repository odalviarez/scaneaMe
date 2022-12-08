import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../Logo/LogoQR.png";
import cartImg from "../../Logo/cart.png";
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

import i18n from '../../i18n'

export default function Navbar() {




  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const userLogin = useSelector((state) => state.userLogin);  
  const { user, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently  } = useAuth0();


  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return `${token}`;
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (cart) dispatch(getTotalProducts(cart.length));
    if (user) dispatch(getUserLogin(user, cart, getToken));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <img src={logo} title="Home" className={styles.logo} alt="logo" />
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
                {i18n.t("navbar.log-in")}
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
                  <FontAwesomeIcon icon="tools" className="mr-3" /> {i18n.t("navbar.account")}
                </DropdownItem>
                <DropdownItem
                  tag={RouterNavLink}
                  to={'/' + user.email}
                  className="dropdown-profile"
                  activeclassname="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="user" className="mr-3" /> {i18n.t("navbar.profile")}
                </DropdownItem>
                <DropdownItem
                  id="qsLogoutBtn"
                  onClick={() => logoutWithRedirect()}
                >
                  <FontAwesomeIcon icon="power-off" className="mr-3" /> {i18n.t("navbar.log-out")}
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
                {i18n.t("navbar.log-in")}
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
                {i18n.t("navbar.account")}
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <FontAwesomeIcon icon="user" className="mr-3" />
              <RouterNavLink
                to="/profile"
                activeclassname="router-link-exact-active"
              >
                {i18n.t("navbar.profile")}
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <FontAwesomeIcon icon="power-off" className="mr-3" />
              <RouterNavLink
                to="#"
                id="qsLogoutBtn"
                onClick={() => logoutWithRedirect()}
              >
                {i18n.t("navbar.log-out")}
              </RouterNavLink>
            </NavItem>
          </Nav>
        )}
      </Container>
      <ul>
        <li>
        <div>
        <Button as={Link} href="/?lng=es">ES</Button>
        <Button as={Link} href="/?lng=en">EN</Button>
        </div>
        </li>
        <li>
          <div className={styles.itemsCart}>{totalItems}</div>
          <Link to={"/cart"}>
            <img src={cartImg} className={styles.cart} alt="cart" />
          </Link>
        </li>
        {userLogin.isAdmin?<li> <Link to={"/dashboard"} className={styles.anchor}>
        {i18n.t("navbar.dashboard")}
          </Link></li> : null}
        <li>
          <Link to={"/catalogue"} className={styles.anchor}>
          {i18n.t("navbar.catalogue")}
          </Link>
        </li>
        <li>
          <Link to={"/about"} className={styles.anchor}>
          {i18n.t("navbar.about-us")}
          </Link>
        </li>
        <li>
          <Link to={"/contact"} className={styles.anchor}>
          {i18n.t("navbar.contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
