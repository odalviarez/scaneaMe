import React from 'react'
import UserAccComp from '../../components/userAccComp/UserAccComp'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import style from './UserAccount.module.css'

export default function UserAccount() {

  return (
    <div >
      <NavBar/>
      <div className={style.UserAccComp}><UserAccComp /></div>
      <Footer/>
    </div>
  )
}
