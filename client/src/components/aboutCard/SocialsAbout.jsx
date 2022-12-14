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
          <a
            href={`http://www.instagram.com/${instagram}`}
            rel='noopener noreferrer'
            target='_blank'
            className={styles.link}
          >
            <img src={igLogo} alt='Instagram link' className={styles.igDiv} />
          </a>
        ) : (
          <></>
        )}

        {github?.length > 0 ? (
          <a
            href={`http://www.github.com/${github}`}
            rel='noopener noreferrer'
            target='_blank'
            className={styles.link}
          >
            <img src={ghLogo} alt='GitHub link' className={styles.ghDiv} />
          </a>
        ) : (
          <></>
        )}

        {linkedin?.length > 0 ? (
          <a
            href={`http://www.linkedin.com//in/${linkedin}`}
            rel='noopener noreferrer'
            target='_blank'
            className={styles.link}
          >
            <img
              src={linkedinLogo}
              alt='LinkedIn link'
              className={styles.liDiv}
            />
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
