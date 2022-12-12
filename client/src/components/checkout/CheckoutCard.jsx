import React from 'react'
import styles from './CheckoutCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { userGetOrders } from '../../redux/actions'
import { useState } from 'react'
import QRCode from 'qrcode'
import { useLocalStorage } from '../../useLocalStorage'
import emailjs, { init } from '@emailjs/browser'

export default function CheckoutCard() {
  const dispatch = useDispatch()
  const { email } = useParams()
  const userOrders = useSelector(state => state.userOrders)
  const [cart, setCart] = useLocalStorage('cartProducts', [])

  console.log('User Order: ', userOrders)

  let lastPurchase = userOrders[userOrders.length - 1]
  
  useEffect(() => {
    emailjs.init('M32ow5bWNcrtlFZss')
    dispatch(userGetOrders(email))
    GenerateQRCode()
    setCart([])
    setTimeout(() => {
      sendEmail()
    }, 1000); 
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
        setQr(url)
      }
    )
  }

  

  const sendEmail = () => {
    const prodAndQty = lastPurchase?.products.map(e => ({
      item: e.description,
      quantity: e.quantity,
    }))
  
    const amount = `$${(lastPurchase?.total)/100}`
    const name = lastPurchase?.shipping.mail
    const adress = `${lastPurchase?.shipping.adress?.country}, ${lastPurchase?.shipping.adress?.state}, ${lastPurchase?.shipping.adress?.city}, ${lastPurchase?.shipping.adress?.line1}`
  
    let purchaseText = ''
    prodAndQty?.map(e => {
      purchaseText = purchaseText.concat(`${e.quantity} ${e.item}, `)
    })
    console.log('Purchase text: ', purchaseText) 
    
    const emailFields = {
      to_name: name,
      to_email: email,
      products: purchaseText,
      amount: amount,
      name: name,
      adress: adress,
    }

    console.log('email fields: ', emailFields)
    emailjs.send('service_rc9xa04', 'template_1s4wf1s', emailFields).then(
      response => {
        console.log('SUCCESS!', response)
      },
      error => {
        console.log('FAILED...', error)
      }
    )
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.gracias}>Muchas gracias por su compra!</div>
      <div className={styles.msjQR}>
        Puedes compartir tu perfil de usuario con el siguiente código QR:
      </div>
      <img src={Qr} id='qr_code' className={styles.codigoQR} alt='Código QR' />
      <div>
        Se le enviará un mail al correo {email} con los pasos a seguir para
        recibir su compra
      </div>
    </div>
  )
}
