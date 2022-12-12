import React from 'react'
import UserAccComp from '../../components/userAccComp/UserAccComp'
import style from './UserAccount.module.css'

export default function UserAccount() {

  return (
    <div >
      <div className={style.UserAccComp}><UserAccComp /></div>
    </div>
  )
}
