import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../useLocalStorage";
import Raiting from "../Rating/Raiting";
import Coments from "../Comments/Coments";
import "./details.css";
import { getTotalProducts, getProductDetails } from "../../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Details({ id }) {
  //estos datos no son necesarios, el id se recibe por params pero seguire trabajando con este id
  const dispatch = useDispatch();
  const [productselect, setProductSelect] = useState("");
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const productsLoaded = useSelector((state) => state.products);
  const productDetails = useSelector((state) => state.productDetail);
  // eslint-disable-next-line no-unused-vars
  const { name, image, price, stock, type, season, comments, ratings } =
    productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (cart) {
      let cartTotal = cart.reduce(
        (acc, currentValue) => acc + currentValue.cartTotalQuantity,
        0
      );
      dispatch(getTotalProducts(cartTotal));
    }
  }, [dispatch, cart, id]);

  const handleAddCart = function (e) {
    e.preventDefault(e);
    //verificamos que el id del producto exista en los productos cargados y traemos toda la info
    let newProduct = productsLoaded.find((p) => p.id === e.target.value);
    //Verificamos si el producto de esa talla ya esta en el carrito y aumentamos el total. Si no esta iniciamos el total en 1.
    let productInCart = cart.find(
      (e) => e.id === newProduct.id && e.size === productselect
    );
    if (productInCart) {
      let cartModified = cart.map((elem) => {
        //*Verificamos que el ID del producto exista
        if (elem.id === productInCart.id && elem.size === productselect) { 
          stock.map((e) =>
            e.size === productselect
              ? e.quantity > elem.cartTotalQuantity //*Luego verificamos que el stock del producto sea mayor a lo agregado al carrito para poder seguir agregando
                ? elem.cartTotalQuantity++
                : ""
              : ""
          );
          console.log(elem);
        }
        return elem;
      });
      setCart(cartModified);
    } else {
      newProduct = { ...newProduct, cartTotalQuantity: 1, size: productselect };
      setCart([...cart, { ...newProduct }]);
    }
    console.log(cart)
    if (e.target.name === "AddAndBuy"){
      window.location.replace( process.env.REACT_APP_URL? process.env.REACT_APP_URL+"cart" : "http://localhost:3000/cart");
    }
  };
  

  const handleOnclick = (e) => {
    setProductSelect(e.target.value);
  };

  return (
    <main className="item">
      <section className="img">
        <img src={image} alt={name} className="img-main" />
      </section>
      <section className="price">
        <h1 className="price-main__heading">{name}</h1>

        <div className="price-box">
          <div className="price-box__main">
            <span className="price-box__main-new">${price}</span>
          </div>
          {stock?.map((e, index) => (
            <button
              type="button"
              key={index}
              disabled={e.quantity < 1}
              onClick={handleOnclick}
              value={e.size}
              className={productselect === e.size ? "btn-selected" : ""}
            >
              {e.size}
            </button>
          ))}
        </div>

        <div className="price-btnbox">
          <button
            className="price-cart__btn btn--orange"
            value={id}
            name="AddCart"
            onClick={handleAddCart}
            disabled={!productselect}
          >
            <img
              height={"30px"}
              src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/shopping-cart-grey-512.png"
              alt="cart_image"
              className="price-cart__btn-img"
            />
            Add to cart
          </button>
          <button
            className="price-cart__btn btn--orange"
            value={id}
            name="AddAndBuy"
            onClick={handleAddCart}
            disabled={!productselect}
          >
            Buy Now
          </button>
        </div>
      </section>
      <Raiting />
      {/* <Coments/> */}
    </main>
  );
}
