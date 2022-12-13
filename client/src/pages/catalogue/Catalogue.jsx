import React from 'react'
import Cards from '../../components/cards/Cards'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import style from './Catalogue.module.css'

export default function Catalogue() {

  return (
    <div >
      <div className={style.CardsComponent}><Cards /></div>
    </div>
  )
}
