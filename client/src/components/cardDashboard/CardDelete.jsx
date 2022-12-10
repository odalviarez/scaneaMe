import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from './Card.module.css'
import { productDelete } from '../../redux/actions'

export default function CardDelete(
  {name, img, id, price, type, color}) {
    const dispatch = useDispatch()
  return (
    <div className={styles.card} >
        
        <div className={styles.imageContainer}>
          <img src={img} alt="imagen" />
        </div>
  
        <Link to={`/products/${id}`} className={styles.title}>{name}</Link>
        <h1>{id}</h1>
        <p>${price}</p>
        <p>{type}</p>
        <p>{color}</p>
        <button value={id} onClick={() => dispatch(productDelete(id))} className="close">Delete</button>
    </div>
  )
}

