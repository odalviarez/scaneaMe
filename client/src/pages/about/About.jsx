import React from 'react'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import {Button} from 'react-bootstrap';
import AboutCard from '../../components/aboutCard/AboutCard.jsx';
import styles from './About.module.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions'
import { useSelector } from 'react-redux';
import octaProfile from '../../Logo/perfil/octa.jpeg'

export default function About() {
  
  

  const emi = { li: '', gh: '', ig: '', img: '', des: '' }
  const octa = { li: 'octa-nav-tech', gh: '', ig: 'octa_navarro', img: octaProfile, des: '' }
  const vic = { li: '', gh: '', ig: '', img: '', des: '' }
  const jonas = { li: '', gh: '', ig: '', img: '', des: '' }
  const gonza = { li: '', gh: '', ig: '', img: '', des: '' }
  const osqui = { li: '', gh: '', ig: '', img: '', des: '' }

  return (
    <div className={styles.container}>
      <h1>Meet the team members</h1>
      <AboutCard li={osqui.li} gh={osqui.gh} ig={osqui.ig} img={osqui.img} des={osqui.des} />     
      <AboutCard li={gonza.li} gh={gonza.gh} ig={gonza.ig} img={gonza.img} des={gonza.des} />     
      <AboutCard li={octa.li} gh={octa.gh} ig={octa.ig} img={emi.img} des={octa.des} />     
      <AboutCard li={emi.li} gh={emi.gh} ig={emi.ig} img={emi.img} des={emi.des} />     
      <AboutCard li={vic.li} gh={vic.gh} ig={vic.ig} img={vic.img} des={vic.des} />     
      <AboutCard li={jonas.li} gh={jonas.gh} ig={jonas.ig} img={jonas.img} des={jonas.des} />     
    </div>
  )
}
