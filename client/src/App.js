import React from 'react'
import { Route, Switch } from 'react-router'
//import { Counter } from './features/counter/Counter';
import Home from './pages/home/Home'
import Catalogue from './pages/catalogue/Catalogue'
import ContactForm from './pages/contactForm/ContactForm'
import Cart from './pages/cart/Cart'
import Detail from './pages/detail/Detail'
import About from './pages/about/About'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Create from './pages/create/Create'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/catalogue"} component={Catalogue}/>
        <Route exact path={"/detail:id"} component={Detail}/>
        <Route exact path={"/cart"} component={Cart}/>
        <Route exact path={"/contact"} component={ContactForm}/>
        <Route exact path={"/about"} component={About}/>
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/create"} component={Create} />
      </Switch>
    </div>
  )
}

export default App
