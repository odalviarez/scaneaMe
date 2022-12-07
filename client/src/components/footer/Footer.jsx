import React from 'react'
import styles from './Footer.module.css'
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { Container, Row, Col } from 'react-bootstrap'
import igLogo from '../../Logo/instagram.png'
import twLogo from '../../Logo/twitter.png'
import linkedinLogo from '../../Logo/linkedin.png'
import githubLogo from '../../Logo/github.png'

import i18n from '../../i18n';

export default function Footer() {
  let date = new Date()
  let year = date.getFullYear()
  return (
    <div className={styles.container}>

      <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <p>{i18n.t('footer.designed-and-developed-by')} {i18n.t('footer.scaneame-team')}</p>
        </Col>
        <Col md="4" className="footer-copywright">
          <p>Copyright © {year} SCANEAME</p>
        </Col>
      </Row>
      <ul className='footer-icons'>
        <li className='social-icons'>
          <a
            href='https://github.com/scanneame'
            style={{ color: 'white' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={githubLogo}
              alt='Github link'
              className={styles.Logo}
            />
          </a>
        </li>
        <li className='liVacio'>
          <a
            href='https://twitter.com/Scannme_'
            style={{ color: 'white' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={twLogo} alt='Twitter link' className={styles.Logo} />
          </a>
        </li>
        <li className='liVacio'>
          <a
            href='https://www.linkedin.com/in/scannme-team/'
            style={{ color: 'white' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={linkedinLogo}
              alt='LinkedIn link'
              className={styles.Logo}
            />
          </a>
        </li>
        <li className='liVacio'>
          <a
            href='https://www.instagram.com/scanneameqr/'
            style={{ color: 'white' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={igLogo} alt='Instagram link' className={styles.Logo} />
          </a>
        </li>
      </ul>
      </Container>
    </div>
  )
}
