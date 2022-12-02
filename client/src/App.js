import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./pages/home/Home";
import Catalogue from "./pages/catalogue/Catalogue";
import ContactForm from "./pages/contactForm/ContactForm";
import Cart from "./pages/cart/Cart";
import Detail from "./pages/detail/Detail";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import UserAccount from "./pages/userAccount/UserAccount";
import Profile from "./pages/profile/Profile";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/user/account" element={<UserAccount />} />
        <Route path="/:email" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
