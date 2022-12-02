
import React from 'react'
import igLogo from '../../Logo/instagram.png'
import twLogo from '../../Logo/twitter.png'
import linkedinLogo from '../../Logo/linkedin.png'
import fbLogo from '../../Logo/facebook.png'
import styles from './Socials.module.css'
import { useState } from 'react'

export default function Socials(facebook, instagram, twitter, linkedin) {
  console.log('insta: ',instagram)


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
              <img src={igLogo} alt="Instagram link" />
            </a>
          </div>
        ) : (
          <></>
        )}

        {twitter?.length > 0 ? (
          <div className={styles.twDiv}>
            <a
              href={`http://www.twitter.com/${twitter}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={twLogo} alt="Twitter link" />
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
              <img src={linkedinLogo} alt="LinkedIn link" />
            </a>
          </div>
        ) : (
          <></>
        )}

        {facebook?.length > 0 ? (
          <div className={styles.fbDiv}>
            <a
              href={`http://www.facebook.com/${facebook}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img src={fbLogo} alt="Facebook link" />
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
