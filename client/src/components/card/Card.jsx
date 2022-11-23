import React from 'react'
import { Link } from 'react-router-dom';

export default function Card({name, img, id, handleAddCart}) {







  return (
    <div  >
        <Link to={`/detail`}><h2>{name}</h2></Link>
        
        <img height="400px" src={img} alt="imagen" />

        <button value={id} onClick={(e) => handleAddCart(e)}>ADD TO CART</button>

    </div>
  )
}
