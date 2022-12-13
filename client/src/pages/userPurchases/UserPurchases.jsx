import React from 'react'
import UserPurComp from '../../components/userPurComp/UserPurComp'
import style from './UserPurchases.module.css'

export default function UserPurchases() {

    return (
    <div style={{minHeight: "80vh"}}>
        <div className={style.UserPurComp}><UserPurComp /></div>
    </div>
    )
}
