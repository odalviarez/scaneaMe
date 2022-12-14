import React from 'react'
import AboutCard from '../../components/aboutCard/AboutCard.jsx';
import styles from './About.module.css'
import octaProfile from '../../Logo/perfil/octa.jpeg'
import emiProfile from '../../Logo/perfil/emi.jpg'
import vicProfile from '../../Logo/perfil/vic.jpg'
import jonasProfile from '../../Logo/perfil/jonas.jpg'
import osquiProfile from '../../Logo/perfil/osqui.jpg'
import gonzaProfile from '../../Logo/perfil/gonza.jpg'

export default function About() {
  
  

  const emi = { li: 'emisael-kisler-fullstack', gh: 'ekisler', ig: 'kisler_tecnologia', img: emiProfile, des: 'Emisael Kisler' }
  const octa = { li: 'octa-nav-tech', gh: 'OctaNavarro', ig: 'octa_navarro', img: octaProfile, des: 'Octavio Navarro' }
  const vic = { li: 'victor-alejandro-herrera-contreras', gh: 'victorherrera95', ig: 'vvher', img: vicProfile, des: 'Victor Herrera' }
  const jonas = { li: 'jonas-ojeda-18308a1ab', gh: 'jonasojeda', ig: 'jonas.ojedaa', img: jonasProfile, des: 'Jonas Ojeda' }
  const gonza = { li: 'gonzalo-zucca-dev', gh: 'gzucca', ig: 'gonzalozucca', img: gonzaProfile, des: 'Gonzalo Zucca' }
  const osqui = { li: 'oscalviarez', gh: 'odalviarez', ig: 'odalviarez', img: osquiProfile, des: 'Oscar Alviarez' }

  return (
    <div className={styles.container}>
      <AboutCard li={osqui.li} gh={osqui.gh} ig={osqui.ig} img={osqui.img} des={osqui.des} />     
      <AboutCard li={gonza.li} gh={gonza.gh} ig={gonza.ig} img={gonza.img} des={gonza.des} />     
      <AboutCard li={octa.li} gh={octa.gh} ig={octa.ig} img={octa.img} des={octa.des} />     
      <AboutCard li={emi.li} gh={emi.gh} ig={emi.ig} img={emi.img} des={emi.des} />     
      <AboutCard li={vic.li} gh={vic.gh} ig={vic.ig} img={vic.img} des={vic.des} />     
      <AboutCard li={jonas.li} gh={jonas.gh} ig={jonas.ig} img={jonas.img} des={jonas.des} />     
    </div>
    
     /*<div className={styles.card}>
      <div className={styles.blob}></div>
      
      
    </div>
  )
}
