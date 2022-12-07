import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import Carru from '../../components/homeBanners/HomeBanners'
import ProdCarru from '../../components/productsCarousel/ProductsCarousel'
import Footer from '../../components/footer/Footer'
import SeasonalBanner from '../../components/homeBanners/SeasonalBanner.jsx'

import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import i18n from '../../i18n';

export default function Home() {
  return (
      <div>
      <NavBar />
        <div>
          <Button as={Link} title="Español" href="/home/?lng=es">ES</Button>
          <Button as={Link} title="English" href="/home/?lng=en">EN</Button>
          <br /> <br />
        </div>
        <div>
          <h1>{i18n.t("home.welcom-to-scaneaMe")}</h1>
        </div>
      <Carru />
      <ProdCarru />
      <ProdCarru />
      <ProdCarru />
      <SeasonalBanner />
      <Footer />
    </div>
  )
}
