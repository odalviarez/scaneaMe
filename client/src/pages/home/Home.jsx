import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import Carru from '../../components/homeBanners/HomeBanners'
import ProdCarru from '../../components/productsCarousel/ProductsCarousel'
import Footer from '../../components/footer/Footer'

export default function Home() {
  return (
    <div>
      <NavBar />
      <Carru />
      <ProdCarru />
      <ProdCarru />
      <ProdCarru />
      <Footer />
    </div>
  )
}
