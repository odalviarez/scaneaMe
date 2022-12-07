import React from 'react'
import UserPurComp from '../../components/userPurComp/UserPurComp'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import style from './UserPurchases.module.css'

export default function UserPurchases() {

    return (
    <div >
        <NavBar/>
        <div className={style.UserPurComp}><UserPurComp /></div>
        <Footer/>
    </div>
    )
}
