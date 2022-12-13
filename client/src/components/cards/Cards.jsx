import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { useLocalStorage } from "../../useLocalStorage";
import {
  filterProducts,
  getAllProducts,
  loadAllProducts,
  sortProducts,
  getTotalProducts,
} from "../../redux/actions";
import styles from "./Cards.module.css";
import Pagination from "../pagination/Pagination";
import { useLocation } from "react-router-dom";
import i18n from "../../i18n";

export default function Cards() {
  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage("cartProducts", []);
  // eslint-disable-next-line no-unused-vars
  const [sort, setSort] = useState(""); //* como se ordenan si no se lee el valor de sort
  const [filters, setFilters] = useState({ filtersApplied: [] });
  const productsLoaded = useSelector((state) => state.products);
  const productsOnStore = useSelector((state) => state.allProducts);
  let location = useLocation();

  //* PAGINADO
  const [currentPage, setcurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const pagination = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = productsLoaded.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    if (productsOnStore.length === 0) {
      dispatch(getAllProducts());
    }

    //* Actualiza el número de articulos en el carrito en la navbar cada vez que se agreguen productos al carrito.
    if (cart) {
      let cartTotal = cart.reduce(
        (acc, currentValue) => acc + currentValue.cartTotalQuantity,
        0
      );
      dispatch(getTotalProducts(cartTotal));
    }

    //* Al salir del componente, se vuelven a cargar todos los productos a la store. Caso contrario al volver al catálogo desde otra página quedaban los productos filtrados aún sin filtros aplicados.
    return () => {
      dispatch(loadAllProducts());
    };
  }, [cart, dispatch, productsOnStore]);

  //! NO COMBINAR LOS USE EFFECTS, CAUSA QUE NO FUNCIONEN COMO SE PRETENDE

  useEffect(() => {
    //* Al ingresar desde el componente HOME con una de las imágenes de la temporada, filtra segun el estado que tiene el componente "Link" que se use
    if (
      filters.filtersApplied.length === 0 &&
      location.state !== null &&
      productsOnStore.length > 0
    ) {
      setFilters((filters) => ({
        filtersApplied: [location.state],
      }));
      dispatch(filterProducts([location.state]));
    }

    // eslint-disable-next-line
  }, [location, dispatch, productsOnStore.length]);

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

  const handleFilters = function (e) {
    e.preventDefault(e);

    let newFiltersCreated = [
      ...filters.filtersApplied,
      {
        filter: e.target.parentNode.attributes.value.value,
        value: e.target.attributes.value.value,
        valor: e.target.innerHTML,
      },
    ];

    let filterUsed = {
      filter: e.target.parentNode.attributes.value.value,
      value: e.target.attributes.value.value,
      valor: e.target.innerHTML,
    };
    if (filters.filtersApplied.length > 0) {
      if (
        filters.filtersApplied.find((f) => f.filter === filterUsed.filter) ===
        undefined
      ) {
        setFilters((filters) => ({
          filtersApplied: [...filters.filtersApplied, filterUsed],
        }));
        setcurrentPage(1);
        dispatch(filterProducts(newFiltersCreated));
      }
    } else {
      setFilters((filters) => ({
        filtersApplied: [filterUsed],
      }));
      setcurrentPage(1);
      dispatch(filterProducts([filterUsed]));
    }
  };

  const removeFilter = function (e) {
    e.preventDefault();
    let newFilters = filters.filtersApplied.filter(
      (filter) => filter.filter !== e.target.attributes[0].value
    );

    setFilters({
      filtersApplied: newFilters,
    });

    if (newFilters.length === 0) {
      dispatch(loadAllProducts());
    } else {
      dispatch(filterProducts(newFilters));
    }
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
      <div className={styles.filtersList}>
        <ul value="season">
          <h3>{i18n.t("header.season")}</h3>
          <li value="allyear" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.all-year")}
          </li>
          <li value="spring" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.spring-summer")}
          </li>
          <li value="fall" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.fall-winter")}
          </li>
        </ul>

        <ul value="type">
          <h3>{i18n.t("header.type-of-clothing")}</h3>
          <li value="shirt" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.t-shirt")}
          </li>
          <li value="pants" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.pants")}
          </li>
          <li value="trunks" onClick={(e) => handleFilters(e)}>
            Shorts de baño
          </li>
        </ul>

        <ul value="color">
          <h3>{i18n.t("header.color")}</h3>
          <li value="white" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.white")}
          </li>
          <li value="black" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.black")}
          </li>
          <li value="red" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.red")}
          </li>
          <li value="blue" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.blue")}
          </li>
          <li value="green" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.green")}
          </li>
          <li value="yellow" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.yellow")}
          </li>
          <li value="gray" onClick={(e) => handleFilters(e)}>
            Gris
          </li>
        </ul>
      </div>

      <div className={styles.filtersApplied}>
        <div>
          <select onChange={(e) => handleSorts(e)}>
            <option value="priceUp">{i18n.t("header.lower-price")}</option>
            <option value="priceDown">{i18n.t("header.higher-price")}</option>
          </select>
        </div>

        {filters.filtersApplied?.map((f, index) => (
          <p key={index} onClick={removeFilter} value={f.filter}>
            X {f.valor}
          </p>
        ))}
      </div>

      <div className={styles.cardsPagination}>
        <Pagination
          cardsPerPage={cardsPerPage}
          productsTotal={productsLoaded.length}
          pagination={pagination}
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
                    handleAddCart={handleAddCart}
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
