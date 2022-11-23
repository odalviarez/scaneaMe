import React from 'react';
import {Route, Switch} from 'react-router'
//import { Counter } from './features/counter/Counter';
import Home from './pages/home/Home';
import Catalogue from './pages/catalogue/Catalogue'
import ContactForm from './pages/contactForm/ContactForm'
import Cart from './pages/cart/Cart'
import Detail from './pages/detail/Detail'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/catalogue"} component={Catalogue}/>
        <Route exact path={"/detail"} component={Detail}/>
        {/* <Route exact path={"/detail:id"} component={Detail}/> */}
        <Route exact path={"/cart"} component={Cart}/>
        <Route exact path={"/contact"} component={ContactForm}/>
      </Switch>
    </div>
  );
}

export default App;
