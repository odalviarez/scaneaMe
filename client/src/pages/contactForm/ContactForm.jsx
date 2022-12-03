import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import Footer from '../../components/footer/Footer'
import ContactMe from '../../components/contactMe/Contact'
import style from './Contact.module.css'

export default function ContactForm() {
  return (
    <div>
      <NavBar />
      <div className={style.body}><ContactMe /></div>
      <Footer />
    </div>
  )
}







