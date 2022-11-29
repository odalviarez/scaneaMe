import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import CreateComponent from '../../components/createComponent/createComponent'
import style from './Create.module.css'

export default function Catalogue() {

  return (
    <div >
      <NavBar/>
      <div className={style.CreateComponent}><CreateComponent /></div>
      <Footer/>
    </div>
  )
}
