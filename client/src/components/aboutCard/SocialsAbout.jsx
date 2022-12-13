import React from 'react'
import igLogo from '../../Logo/instagram.png'
import ghLogo from '../../Logo/github.png'
import linkedinLogo from '../../Logo/linkedin.png'
import styles from './SocialsAbout.module.css'

export default function Socials({ github, instagram, linkedin }) {
  return (
    <div>
      <div className={styles.container}>
        {instagram?.length > 0 ? (
          <div className={styles.igDiv}>
            <a
              href={`http://www.instagram.com/${instagram}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={igLogo} alt='Instagram link' />
            </a>
          </div>
        ) : (
          <></>
        )}

        {github?.length > 0 ? (
          <div className={styles.ghDiv}>
            <a
              href={`http://www.twitter.com/${github}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={ghLogo} alt='GitHub link' />
            </a>
          </div>
        ) : (
          <></>
        )}

        {linkedin?.length > 0 ? (
          <div className={styles.liDiv}>
            <a
              href={`http://www.linkedin.com//in/${linkedin}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={linkedinLogo} alt='LinkedIn link' />
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
