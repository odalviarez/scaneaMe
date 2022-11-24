import React from 'react'
import { useLocalStorage } from '../../useLocalStorage'

export default function CartComponent() {

  const [cart, setCart] = useLocalStorage('cartProducts', {
    cartProducts: []
  });




  return (
    <div>
      {cart.cartProducts.map(p => 
      <div key={Math.floor(Math.random()*100*(Number(p.id) + 21))}>
        {p.name}
      </div>)}
    </div>
  )
}
