import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({ name, img, id, price, color }) {
  return (
    <div className={styles.card}>
      <Link to={`/detail/${id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <img src={img} alt='imagen' />
        </div>
        <div className={styles.cardsDescription}>
          <div className={styles.title}>{name}</div>
          <p>${price}</p>
          <p>Color: {color}</p>
        </div>
      </Link>
    </div>
  )
}
