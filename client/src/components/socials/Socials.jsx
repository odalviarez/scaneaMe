import React from 'react'
import { Link } from 'react-router-dom'
import igLogo from '../../Logo/instagram.png'
import twLogo from '../../Logo/twitter.png'
import linkedinLogo from '../../Logo/linkedin.png'
import fbLogo from '../../Logo/facebook.png'
import styles from './Socials.module.css'

export default function Socials() {
  const userIg = 'octa_navarro'
  const userFb = 'octavio.navarro.794'
  const userTw = 'navarroocta'
  const userLi = 'octa-nav-tech'

  return (
    <div>
      <div className={styles.container}>
        {userIg.length > 0 ? (
          <div className={styles.igDiv}>
            <a
              href={`http://www.instagram.com/${userIg}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={igLogo} alt='Instagram link' />
            </a>
          </div>
        ) : (
          <></>
        )}

        {userTw.length > 0 ? (
          <div className={styles.twDiv}>
            <a
              href={`http://www.twitter.com/${userTw}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={twLogo} alt='Twitter link' />
            </a>
          </div>
        ) : (
          <></>
        )}

          {userLi.length > 0 ? (
        <div className={styles.liDiv}>
          <a
            href={`http://www.linkedin.com//in/${userLi}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            <img src={linkedinLogo} alt='LinkedIn link' />
          </a>
        </div>) : (<></>)}

          {userFb.length > 0 ? (  
        <div className={styles.fbDiv}>
          <a
            href={`http://www.facebook.com/${userFb}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            <img src={fbLogo} alt='Facebook link' />
          </a>
        </div>) : (<></>)}
      </div>
    </div>
  )
}
