import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

export default function Card({name, img, id, price, type, color, handleAddCart}) {







  return (
    <div className={styles.card} >
        <Link to={`/detail`}><p>{name}</p></Link>
        
        <img src={img} alt="imagen" />
        <p>{price}</p>
        <button value={id} onClick={(e) => handleAddCart(e)}>ADD TO CART</button>

    </div>
  )
}
