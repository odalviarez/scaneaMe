import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import Carru from '../../components/homeBanners/HomeBanners'
import ProdCarru from '../../components/productsCarousel/ProductsCarousel'
import Footer from '../../components/footer/Footer'
import SeasonalBanner from '../../components/homeBanners/SeasonalBanner.jsx'


export default function Home() {
  return (
    <div>
      <NavBar />
      <Carru />
      <ProdCarru />
      <ProdCarru />
      <ProdCarru />
      <SeasonalBanner />
      <Footer />
    </div>
  )
}
