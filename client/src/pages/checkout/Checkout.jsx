import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import CheckoutCard from '../../components/checkout/CheckoutCard'
import Footer from '../../components/footer/Footer'

export default function Checkout() {
  return (
    <div>
      <NavBar/>
      <CheckoutCard/>
      <Footer/>
    </div>
  )
}
