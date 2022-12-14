import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../cardDashboard/CardDelete";
import { useLocalStorage } from "../../useLocalStorage";
import { getAllProducts, loadAllProducts, sortProducts, getTotalProducts} from "../../redux/actions";
import styles from "./Cards.module.css";
import Pagination from "../pagination/Pagination";


import i18n from '../../i18n'

export default function Cards() {
  const dispatch = useDispatch();

    // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const [setSort] = useState("");
  const productsLoaded = useSelector((state) => state.products);
  const productsOnStore = useSelector((state) => state.allProducts);
  


  //* PAGINADO
  const [currentPage, setcurrentPage] = useState(1);
  const [cardsPerPage] = useState(14);
  const pagination = (pageNumber) => {setcurrentPage(pageNumber)};
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = productsLoaded.slice(indexOfFirstCard,indexOfLastCard);
  


  useEffect(() => {
    if (productsOnStore.length === 0) {
      dispatch(getAllProducts());
    }
    //* Actualiza el número de articulos en el carrito en la navbar cada vez que se agreguen productos al carrito.
    if (cart) {
      let cartTotal = cart.reduce((acc, currentValue) => acc + currentValue.cartTotalQuantity, 0);
      dispatch(getTotalProducts(cartTotal));
    }
    // eslint-disable-next-line
  }, [cart, dispatch, productsOnStore]);

  useEffect(() => {
    //* Al salir del componente, se vuelven a cargar todos los productos a la store. Caso contrario al volver al catálogo desde otra página quedaban los productos filtrados aún sin filtros aplicados.
    return () => {
      dispatch(loadAllProducts())
    }
    // eslint-disable-next-line
  }, [productsOnStore]);

  // eslint-disable-next-line
  const handleSorts = function (e) {
    e.preventDefault(e);
    dispatch(sortProducts(e.target.value));
    setSort(e.target.value);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
      <div className={styles.CatalogueParent}>
        <div className={styles.filtersList}></div>
        <Pagination
          cardsPerPage={cardsPerPage}
          cardsTotal={productsLoaded.length}
          pagination={pagination}
          currentPage={currentPage}
        />

        <div className={styles.cardsPagination}>
          <div className={styles.CatalogueCards}>
            {currentCards.length
              ? currentCards.map((p) => {
                  return (
                    <Card
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      img={p.image}
                      price={p.price}
                      type={p.type}
                      color={p.color}
                    />
                  );
                })
              : i18n.t("header.no-product-was-found")}
          </div>

          <Pagination
            cardsPerPage={cardsPerPage}
            cardsTotal={productsLoaded.length}
            pagination={pagination}
            currentPage={currentPage}
          />
          <button onClick={(e) => scrollToTop(e)}>
            {i18n.t("header.back-to-top")}
          </button>
        </div>
      </div>
    );
}
