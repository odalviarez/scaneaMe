import React from 'react'
import styles from './Footer.module.css'
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram, } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className={styles.container}>
      <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <p>Designed and Developed by: Scaneame Team</p>
          </Col>
          <Col md="4" className="footer-copywright">
          <p>Copyright © {year} SCANEAME</p>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/scanneame"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://twitter.com/Scannme_"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/scannme-team/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/scanneameqr/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
            </ul>
            </Col>
          </Row>
          </Container>
    </div>
  )
}
