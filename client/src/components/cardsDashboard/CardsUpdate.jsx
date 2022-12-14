import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../cardDashboard/CardUpdate";
import { useLocalStorage } from "../../useLocalStorage";
import { getAllProducts, loadAllProducts, sortProducts, getTotalProducts} from "../../redux/actions";
import styles from "./Cards.module.css";
import Pagination from "../pagination/Pagination";
import { useLocation } from 'react-router-dom';

import i18n from '../../i18n'

export default function CardsUpdate() {
  const dispatch = useDispatch();

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
  }, [cart, dispatch, productsOnStore]);

  useEffect(() => {

   

    //* Al salir del componente, se vuelven a cargar todos los productos a la store. Caso contrario al volver al catálogo desde otra página quedaban los productos filtrados aún sin filtros aplicados.
    return () => {
      dispatch(loadAllProducts())
    }
    
  }, [productsOnStore]);

  const handleAddCart = function (e) {
    e.preventDefault(e);
    //verificamos que el id del producto exista en los productos cargados y traemos toda la info
    let newProduct = productsLoaded.find((p) => p.id === e.target.value);
    //Verificamos si el producto ya esta en el carrito y aumentamos el total. Si no esta iniciamos el total en 1.
    let productInCart = cart.find((elem) => elem.id === newProduct.id);
    if (productInCart) {
      let cartModified = cart.map((elem) => {
        if (elem.id === productInCart.id) {
          elem.cartTotalQuantity++;
        }
        return elem;
      });
      setCart(cartModified);
    } else {
      newProduct = { ...newProduct, cartTotalQuantity: 1 };
      setCart([...cart, { ...newProduct }]);
    }
  };

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

        <div className={styles.cardsPagination}>
          <Pagination
            cardsPerPage={cardsPerPage}
            cardsTotal={productsLoaded.length}
            pagination={pagination}
            currentPage={currentPage}
          />

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
                      stock={p.stock}
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
