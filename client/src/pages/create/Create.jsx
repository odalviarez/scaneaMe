import React from 'react'
import CreateComponent from '../../components/createComponent/createComponent'
import style from './Create.module.css'

export default function Create() {

  return (
    <div style={{minHeight: "80vh"}}>
      <div className={style.CreateComponent}><CreateComponent /></div>
    </div>
  )
}
