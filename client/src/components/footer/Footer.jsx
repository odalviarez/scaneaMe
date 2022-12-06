import React from 'react'
import styles from './Footer.module.css'
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { Container, Row, Col } from 'react-bootstrap'
import igLogo from '../../Logo/instagram.png'
import twLogo from '../../Logo/twitter.png'
import linkedinLogo from '../../Logo/linkedin.png'
import githubLogo from '../../Logo/github.png'

export default function Footer() {
  let date = new Date()
  let year = date.getFullYear()
  return (
    <div className={styles.container}>
      <Container fluid className='footer'>
        <Row>
          <div className={styles.designed}>
            <p>Designed and Developed by: scaneaMe Team</p>
          </div>
          <div md='4' className={styles.copyright}>
            <p>Copyright © {year} SCANEAME</p>
          </div>
          <Col md='4' className='footer-body'>
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
                    className={styles.githubLogo}
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
                  <img
                    src={twLogo}
                    alt='Twitter link'
                    className={styles.twLogo}
                  />
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
                    className={styles.liLogo}
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
                  <img
                    src={igLogo}
                    alt='Instagram link'
                    className={styles.igLogo}
                  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
