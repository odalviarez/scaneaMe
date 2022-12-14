import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Cardupdate.module.css'

export default function CardUpdate({name, img, id, price, type, color, handleUpdate}) {

  return (
    <div className={styles.card} >
        
        <div className={styles.imageContainer}>
          <img src={img} alt="imagen" />
        </div>
  
        <h3 className={styles.title}>{name}</h3>
        <p>{name}</p>
        <p>{type}</p>
        <p>${price}</p>
        <Link to={`/dashboard/adminProducts/detail/:id${id}`} className={styles.title}>Edit</Link>
        
    </div>
  )
}
