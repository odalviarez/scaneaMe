import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux';
import NavBar from '../../components/navBar/NavBar.jsx'
import Carru from '../../components/homeBanners/HomeBanners'
import ProdCarru from '../../components/productsCarousel/ProductsCarousel'
import Footer from '../../components/footer/Footer'
import SeasonalBanner from '../../components/homeBanners/SeasonalBanner.jsx'
import { getAllProducts } from '../../redux/actions';
import styles from './Home.module.css'
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';
import i18n from '../../i18n'


export default function Home() {

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getAllProducts())
    }, [dispatch])
  
    return (
    <div>
      <NavBar />
        {/* <div>
          <h1>{i18n.t("home.welcom-to-scaneaMe")}</h1>
        </div> */}
      <Carru />
      <h2 className={styles.tituloCarru}>Nuestras remeras:</h2>
      <ProdCarru productType={'shirt'}/>
      <h2 className={styles.tituloCarru}>Nuestros shorts de baño:</h2>
      <ProdCarru productType={'trunks'}/>
      <h2 className={styles.tituloCarru}>Nuestros pantalones:</h2>
      <ProdCarru productType={'pants'} />
      <h2 className={styles.tituloSeason}>Selección por temporadas:</h2>
      <SeasonalBanner />
      <Footer />
    </div>
  )
}
