import React from 'react'
import styles from './CheckoutCard.module.css'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../redux/actions'
import { useState } from 'react'
import QRCode from 'qrcode'

export default function CheckoutCard() {
  const dispatch = useDispatch()
  const { email } = useParams()
  //const userDB = useSelector(state => state.userDB)

  useEffect(() => {
    dispatch(getUser(email))
    GenerateQRCode()
  }, [])

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      `https://scaneame.vercel.app/${email}`,
      {
        width: 800,
        margin: 2,
        color: {
          dark: '#335383FF',
          light: '#EEEEEEFF',
        },
      },
      (err, url) => {
        if (err) return console.error(err)

        console.log(url)
        setQr(url)
      }
    )
  }

  const [Qr, setQr] = useState('')
 
  return (
    <div className={styles.container}>
      <div className={styles.gracias}>Muchas gracias por su compra!</div>
      <div className={styles.msjQR}>
        Puedes compartir tu perfil de usuario con el siguiente código QR:
      </div>
      <img src={Qr} className={styles.codigoQR} alt='Código QR' />
      <div>
        Se le enviará un mail al correo {email} con los pasos a seguir para
        recibir su compra
      </div>
    </div>
  )
}
