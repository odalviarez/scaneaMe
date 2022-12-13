import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

export default function Card({name, img, id, price, type, color}) {



  return (
    <div className={styles.card} >
        
        <div className={styles.imageContainer}>
          <img src={img} alt="imagen" />
        </div>
  
        <Link to={`/detail/${id}`} className={styles.title}>{name}</Link>
        <p>${price}</p>
        <p>Color: {color}</p>
        {/* <button value={id} onClick={(e) => handleAddCart(e)}>ADD TO CART</button> */}

    </div>
  )
}
