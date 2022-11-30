import React from 'react'
import Socials from '../socials/Socials'
import styles from './ProfileCard.module.css'
import userImg from '../../Logo/userImg.jpeg'

export default function ProfileCard() {
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium saepe enim, animi tempore nemo nihil quas distinctio nulla commodi molestiae in quisquam consequatur, praesentium eum quidem ullam laborum tempora quo!'

  return (
    <div className={styles.container}>
      <img src={userImg} className={styles.userImg} alt='User' />
      <div className={styles.descriptionSocials}>
      <div className={styles.description}>{description}</div>
      <div className={styles.socialsContainer}>
        <Socials />
      </div>
      </div>
    </div>
  )
}
