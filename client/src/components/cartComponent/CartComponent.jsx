import React from 'react'
import { useLocalStorage } from '../../useLocalStorage'

export default function CartComponent() {

  const [cart, setCart] = useLocalStorage('cartProducts', {
    cartProducts: []
  });




  return (
    <div>
      {cart.cartProducts.map(p => 
      <div>
        {p.name}
      </div>)}
    </div>
  )
}
