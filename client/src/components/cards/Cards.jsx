import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import products from '../../productos'
import Card from '../card/Card'
import { useLocalStorage } from '../../useLocalStorage'

export default function Cards() {

  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage('cartProducts', {
    cartProducts: []
  });

  

  const handleAddCart = function (e) {
    e.preventDefault(e);
    console.log(e.target.value);
    const newProduct = products.find(p => p.id === Number(e.target.value))
    console.log('este es newProduct', newProduct);
    setCart({
      cartProducts: [...cart.cartProducts, newProduct]
    })
  }



  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);








  return (
    <div>
    
      <div>
        {products? products.map(p => {
          return <Card
          key={p.id}
          id={p.id}
          name={p.name}
          img={p.image}
          handleAddCart = {handleAddCart}
          />
        }) : 'No product was found'}
      </div>
    
    
    
    </div>

  )
}
