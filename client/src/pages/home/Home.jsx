import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import NavBarAU from "../../components/navBar/NavBarAuth0";
import Carru from '../../components/homeBanners/HomeBanners'
import ProdCarru from '../../components/productsCarousel/ProductsCarousel'
import Footer from '../../components/footer/Footer'
import SeasonalBanner from '../../components/homeBanners/SeasonalBanner.jsx'
import NavBarF from "../../components/navBar/NavBarF.jsx";

export default function Home() {
  return (
    <div>
      <NavBarF />
      <Carru />
      <ProdCarru />
      <ProdCarru />
      <ProdCarru />
      <SeasonalBanner />
      <Footer />
    </div>
  )
}
