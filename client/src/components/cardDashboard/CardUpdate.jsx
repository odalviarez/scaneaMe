import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Cardupdate.module.css'

export default function CardUpdate({name, img, id, price, type, color, stock}) {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={img} alt={img} />
      </div>

      <h3 className={styles.title}>{name}</h3>
      <div className={styles.divSize}>
        {stock?.map((elem) => (
        <p>
            {elem.size} : {elem.quantity}
            </p>
            ))}
      </div>
      <p>${price}</p>
      <Link to={`detail/${id}`} className={styles.title}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
