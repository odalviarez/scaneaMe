import React from 'react'
import SocialsAbout from './SocialsAbout'
import styles from './AboutCard.module.css'

export default function AboutCard({ li, gh, ig, img, des }) {
  return (
    <div>
      <div className={styles.container}>
        <img src={img} className={styles.userImg} alt='User' />
        
          <div className={styles.description}>{des}</div>
          <div className={styles.socialsContainer}>
            <SocialsAbout
              github={gh}
              instagram={ig}
              linkedin={li}
            />
          </div>
        
      </div>
    </div>
  )
}
