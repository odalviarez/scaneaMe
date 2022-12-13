import "./App.css";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Catalogue from "./pages/catalogue/Catalogue";
import ContactForm from "./pages/contactForm/ContactForm";
import Cart from "./pages/cart/Cart";
import Detail from "./pages/detail/Detail";
import About from "./pages/about/About";
import UserAccount from "./pages/userAccount/UserAccount";
import UserPurchases from "./pages/userPurchases/UserPurchases";
import Profile from "./pages/profile/Profile";
import EditProduct from "./pages/edit/DetailUpdate"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";
import { Auth0Provider, withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import initFontAwesome from "./utils/initFontAwesome";
import Checkout from "./pages/checkout/Checkout";
import Navbar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import AdminUsers from "./pages/adminUsers/AdminUsers";
import Dashboard from "./pages/dashboard/Dashboard";



initFontAwesome();

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};


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
      <Auth0ProviderWithRedirectCallback
        domain="dev-a3kheszuwvfvuoad.us.auth0.com"
        clientId="zVBOjQQhQSTxp3S8KRXOfLaMVMruuk2u"
        redirectUri={window.location.origin}
        audience="https://scaneame.vercel.app/"
        //scope="read:current_user update:current_user_metadata"
      >
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/detail/:id" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route
           
            path="/user/account"
           
            element={<ProtectedRoute component={UserAccount} />}
         
          />
          <Route
           
            path="/user/purchases"
           
            element={<ProtectedRoute component={UserPurchases} />}
         
          />
          <Route path="/:email" element={<Profile />} />
          <Route
            path="/checkout/:email"
            element={<ProtectedRoute component={Checkout} />}
          />

          <Route
            path="/dashboard/adminUsers" element={<ProtectedRoute component={AdminUsers} />}
          />
        </Routes>
        <Footer/>
      </Auth0ProviderWithRedirectCallback>
    </div>
  );
}

export default App;
