import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../useLocalStorage";
import { getTotalProducts } from "../../redux/actions";
import PayButton from "./PayButton";
import "./CartComponent.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
} from "reactstrap";

export default function CartComponent() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [cart, setCart] = useLocalStorage("cartProducts", []);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);


    const dispatch = useDispatch();


    useEffect(() =>{
      let cartCopy = [0, ...cart];
      let totalAmount = cartCopy.reduce((acc, currentValue) => {
        let total = currentValue.price * currentValue.cartTotalQuantity;
        return acc + total;
      });
      setCartTotalAmount(totalAmount);
          if (cart) {
            let cartTotal = cart.reduce(
              (acc, currentValue) => acc + currentValue.cartTotalQuantity,
              0
            );
            dispatch(getTotalProducts(cartTotal));
          }
    }, [cart, dispatch])

  const handleAddToCart = (id, size) => {
    console.log(cart)
    let cartModified = cart.map((elem) => {
      if (elem.id === id && elem.size === size) {
         elem.stock.map((e) =>
           e.size === size
             ? e.quantity > elem.cartTotalQuantity //*Luego verificamos que el stock del producto sea mayor a lo agregado al carrito para poder seguir agregando
               ? elem.cartTotalQuantity++
               : ""
             : ""
         );
      }
      return elem;
    });
    setCart(cartModified);
  };
  const handleDecreaseCart = (id, size) => {
    let cartModified = cart.map((elem) => {
      if (elem.id === id && elem.size === size) {
        if (elem.cartTotalQuantity > 0) elem.cartTotalQuantity--;
      }
      return elem;
    });
    setCart(cartModified);
  };
  const handleRemoveFromCart = (id, size) => {
    console.log(cart)
    setCart(cart.filter((elem) => (elem.id !== id || elem.size !== size))) //*En el filter es raro como funciona. Con el && ers si uno o el otro se cumplia lo filtraba
  };
  const handleClearCart = () => {
    setCart([]);
  };
  
  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/catalogue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id + cartItem.size}>
                <div className="cart-product">

                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name} ({(cartItem.size).toUpperCase()})</h3>
                    <button
                      onClick={() =>
                        handleRemoveFromCart(cartItem.id, cartItem.size)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button
                    onClick={() =>
                      handleDecreaseCart(cartItem.id, cartItem.size)
                    }
                  >
                    -
                  </button>
                  <div className="count">{cartItem.cartTotalQuantity}</div>
                  <button
                    onClick={() => handleAddToCart(cartItem.id, cartItem.size)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartTotalQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              {isAuthenticated ? (
                <PayButton cartItems={cart} />
              ) : (
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin"
                  onClick={() => loginWithRedirect()}
                >
                  Log in to checkout
                </Button>
              )}
              <div className="continue-shopping">
                <Link to="/catalogue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {cart.cartProducts.map(p =>
  //     <div key={Math.floor(Math.random()*100*(Number(p.id) + 21))}>
  //       {p.name}
  //     </div>)}
  //   </div>
  // )
}
