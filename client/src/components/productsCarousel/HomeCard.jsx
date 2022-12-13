import React from 'react'
import styles from './HomeCard.module.css'
import { Link } from 'react-router-dom'

export default function HomeCard(props) {
  return (
    <Link to={'/detail/' + props.id}>
      <div className={styles.card}>
        <img className={styles.image} src={props.image} alt='product' />
        <div className={styles.price}>${props.price}</div>

      </div>
    </Link>
    /*<div className={styles.container}>
    </div>*/
  )
}

