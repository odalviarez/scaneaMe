import React from 'react'
import styles from './CheckoutCard.module.css'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../redux/actions'
import { useState } from 'react'
import QRCode from 'qrcode'
import { useLocalStorage } from '../../useLocalStorage'
import emailjs from '@emailjs/browser'

export default function CheckoutCard() {
  const dispatch = useDispatch()
  const { email } = useParams()
  //const userDB = useSelector(state => state.userDB)
  const [cart, setCart] = useLocalStorage('cartProducts', [])

  useEffect(() => {
    dispatch(getUser(email))
    GenerateQRCode()
    setCart([])
  }, [])

  const [Qr, setQr] = useState('')

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

  const [emailFields, setEmailFields] = useState({
    to_name: '',
    to_email: '',
    qr_code: '',
  })


    let indice = email.indexOf('@')
    let emailName = email.substring(0, indice)

    let QrBase64 = Qr.toDataURL();

  setEmailFields({
    to_name: emailName,
    to_email: email,
    qr_code: QrBase64
  })

  emailjs
    .sendForm(
      'service_rc9xa04',
      'template_1s4wf1s',
      emailFields,
    )
    .then(
      response => {
        console.log('SUCCESS!', response)
        setEmailFields({
          to_name: '',
          to_email: '',
          qr_code: '',
        })
      },
      error => {
        console.log('FAILED...', error)
      }
    )

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
