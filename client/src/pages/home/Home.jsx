import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Carru from "../../components/homeBanners/HomeBanners";
import ProdCarru from "../../components/productsCarousel/ProductsCarousel";
import SeasonalBanner from "../../components/homeBanners/SeasonalBanner.jsx";
import { getAllProducts } from "../../redux/actions";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Carru />
      <h2 className={styles.tituloCarru}>Nuestras remeras:</h2>

      <ProdCarru productType={"shirt"} />

      <h2 className={styles.tituloCarru}>Nuestros shorts de baño:</h2>

      <ProdCarru productType={"trunks"} />

      <h2 className={styles.tituloCarru}>Nuestros pantalones:</h2>

      <ProdCarru productType={"pants"} />

      <h2 className={styles.tituloSeason}>Colecciones:</h2>

      <SeasonalBanner />
    </div>
  );
}
