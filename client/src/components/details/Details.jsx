import React, { useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../useLocalStorage";
import Raiting from "../Rating/Raiting";
import Coments from "../Comments/Coments";
import './details.css'
export default function Details({name, type, stock, color, price, image, id}) {

  
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const productsLoaded = useSelector((state) => state.products);
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

          <div className='radio__group'>
          <div className="radio__button">
            <input checked type="radio" id="type1" name="type" value="small"/>
            <label data-icon="S" for="type1"><p>Small</p></label>
          </div>
  
          <div className="radio__button">
            <input disabled type="radio" id="type2" name="type" value="medium"/>
            <label data-icon="M" for="type2"><p>Medium</p></label>
          </div>
  
          <div className="radio__button">
            <input type="radio" id="type3" name="type" value="large"/>
            <label data-icon="L" for="type3">
              <p>Large</p>
            </label>
          </div>
          
          <div className="radio__button">
            <input type="radio" id="type4" name="type" value="extra-large"/>
            <label data-icon="XL" for="type4"><p>Extra Large</p></label>
          </div>
          </div>

        </div>

        <div className="price-btnbox">
          
          <button className="price-cart__btn btn--orange" value={id} onClick={(e) => handleAddCart(e)}>
            <img
              height={'30px'}
              src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/shopping-cart-grey-512.png"
              alt="cart image"
              className="price-cart__btn-img"
            />
            Add to cart
          </button>
          <button className="price-cart__btn btn--orange">
            Buy Now
          </button>
          
        </div>
        
      </section>
      <Raiting/>
      {/* <Coments/> */}
    </main>
  )
}