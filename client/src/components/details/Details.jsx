import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../useLocalStorage";
import Raiting from "../Rating/Raiting";
import Coments from "../Comments/Coments";
import { getTotalProducts, getProductDetails } from "../../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PruebaDT({ id }) {
  //estos datos no son necesarios, el id se recibe por params pero seguire trabajando con este id
  const dispatch = useDispatch();
  const [productselect, setProductSelect] = useState("");
  const [cart, setCart] = useLocalStorage("cartProducts", []);
  const productsLoaded = useSelector((state) => state.products);
  const productDetails = useSelector((state) => state.productDetail);
  // eslint-disable-next-line no-unused-vars
  const { name, image, price, stock, type, season, comments, ratings } = productDetails;

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

    <section className="text-gray-700 body-font overflow-hidden backdrop-blur-sm ">
    <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={image}/> 
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">{name}</h1>
                <div className="flex mb-4">
                    
                    <span className="title-font font-medium text-2xl text-gray-900">${price}</span>
                </div>
                {stock?.map((e, index) => (
            <div>
                <button 
                type="button"
                key={index}
                disabled={e.quantity < 1}
                onClick={handleOnclick}
                value={e.size}
                class="py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border bg-white/30 border-gray-700 hover:backdrop-blur-sm hover:bg-white/50 hover:text-slate-700 focus:z-10 focus:ring-2 focus:ring-slate-700 focus:text-slate-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-slate-500 dark:focus:text-white">
                    {e.size}
                </button>

              <span className="title-font font-medium text-2xl text-gray-900">   Cantidad: {e.quantity}</span>
            </div>
            ))}
            
                <div className="flex border-t border-gray-300 mt-5 pt-5">
                    
                    <button
                            className="bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition w-full"
                            value={id}
                            name="AddCart"
                            onClick={handleAddCart}
                            disabled={!productselect}>
                        Add to Cart
                    </button>
                  
                  <button   
                    value={id}
                    name="AddAndBuy"
                    onClick={handleAddCart}
                    disabled={!productselect}
                    className="bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition w-full">
                    buy Now
                  </button>


                  
                </div>
            </div>
        </div>
    </div>
</section>
  );
}

