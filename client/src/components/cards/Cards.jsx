import React, { useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { useLocalStorage } from "../../useLocalStorage";
import {  filterProducts,  getAllProducts,  loadAllProducts,  sortProducts, getTotalProducts} from "../../redux/actions";
import styles from "./Cards.module.css";
import Pagination from "../pagination/Pagination";
import { useLocation, Link } from 'react-router-dom';
import { Button } from "reactstrap";

import i18n from '../../i18n'

export default function Cards() {
  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({ filtersApplied: [] });
  const [currentPage, setcurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const productsLoaded = useSelector((state) => state.products);
  const productsOnStore = useSelector((state) => state.allProducts);
  let location = useLocation()
  const pagination = (pageNumber) => {setcurrentPage(pageNumber);
  };

  

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = productsLoaded.slice(indexOfFirstCard,indexOfLastCard);

  useEffect(() => {
    if (productsOnStore.length === 0) {
      dispatch(getAllProducts());
    }

    if (cart) dispatch(getTotalProducts(cart.length));

  }, [cart]);

  useEffect(() => {

    if (filters.filtersApplied.length === 0 && location.state !== null && productsOnStore.length > 0) {
      console.log("se ejecutó esto");
      setFilters((filters) => ({
        filtersApplied: [location.state],
      }));
      dispatch(filterProducts([location.state]))
    }

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

  const handleFilters = function (e) {
    e.preventDefault(e);
    let filtersUsed = [
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
        filters.filtersApplied.find((f) => f.value === filterUsed.value) ===
        undefined
      ) {
        setFilters((filters) => ({
          filtersApplied: [...filters.filtersApplied, filterUsed],
        }));
        setcurrentPage(1)
        dispatch(filterProducts(filtersUsed));
      }
    } else {
      setFilters((filters) => ({
        filtersApplied: [filterUsed],
      }));
      setcurrentPage(1)
      dispatch(filterProducts([filterUsed]));
    }
  };

  const removeFilter = function (e) {
    e.preventDefault();
    let newFilters = filters.filtersApplied.filter(
      (filter) => filter.value !== e.target.attributes.value.value
    );
    setFilters((filters) => ({
      filtersApplied: newFilters,
    }));
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
            <li value="allyear" onClick={(e) => handleFilters(e)} >{i18n.t("header.all-year")}</li>
            <li value="spring" onClick={(e) => handleFilters(e)}>{i18n.t("header.spring-summer")}</li>
            <li value="fall" onClick={(e) => handleFilters(e)}>{i18n.t("header.fall-winter")}</li>
          </ul>
          
          <ul value="type">
            <h3>{i18n.t("header.type-of-clothing")}</h3>
            <li value="shirt" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.t-shirt")}
            </li>
            <li value="pants" onClick={(e) => handleFilters(e)}>
            {i18n.t("header.pants")}
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
            <p key={index} onClick={removeFilter} value={f.value}>
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
            productsTotal={productsLoaded.length}
            pagination={pagination}
          />
          <button onClick={(e) => scrollToTop(e)}>{i18n.t("header.back-to-top")}</button>
        </div>
        <div>
        <Button as={Link} title="Español" href="/catalogue/?lng=es">ES</Button>
        <Button as={Link} title="English" href="/catalogue/?lng=en">EN</Button>
        <br /> <br />
        </div>
      </div>
    );
}
