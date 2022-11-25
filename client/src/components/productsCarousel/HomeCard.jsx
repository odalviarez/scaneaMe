import React from 'react'
import styles from './HomeCard.module.css'
import { Link } from 'react-router-dom'

export default function HomeCard(props) {
  return (
    <div className={styles.container}>
      <Link to={'/detail/' + props.id}>
        <img className={styles.image} src={props.image} alt='product' />
        <div className={styles.price}>${props.price}</div>
      </Link>
    </div>
  )
}
