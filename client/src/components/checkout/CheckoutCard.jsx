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
import { useAuth0 } from "@auth0/auth0-react";

export default function CheckoutCard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch()
  const { email } = useParams()
  const userOrders = useSelector(state => state.userOrders)
  const [cart, setCart] = useLocalStorage('cartProducts', [])

    const getToken = async () => {
      const token = await getAccessTokenSilently();
      return `${token}`;
    };

  let lastPurchase = userOrders[userOrders.length - 1]
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    emailjs.init('vGQTOpiT1rYKFB3ox')
    dispatch(userGetOrders(email, getToken))
    GenerateQRCode()
    setCart([])
    if (lastPurchase?.hasOwnProperty('products')) {
      sendEmail()
    }
  }, [trigger])

  const [Qr, setQr] = useState('')

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      `https://scaneame.vercel.app/userProfile/${email}`,
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

  setTimeout(() => {
    setTrigger(1)
  }, 2000);

  const sendEmail = () => {
    let prodAndQty = lastPurchase?.products.map(e => ({
      item: e.description,
      quantity: e.quantity,
    }))

    let amount = `$${lastPurchase?.total / 100}`
    let name = lastPurchase?.shipping.name
    let adress = `${lastPurchase?.shipping.address?.country}, ${lastPurchase?.shipping.address?.state}, ${lastPurchase?.shipping.address?.city}, ${lastPurchase?.shipping.address?.line1}`

    let purchaseText = ''
    prodAndQty?.map(e => {
      purchaseText = purchaseText.concat(`${e.quantity} ${e.item}, `)
    })


    let emailFields = {
      to_name: name,
      to_email: email,
      products: purchaseText,
      amount: amount,
      name: name,
      adress: adress,
    }

    console.log('email fields: ', emailFields)
    emailjs.send('service_0hpnim5', 'template_7cgjln7', emailFields).then(
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
      <h2 className={styles.gracias}>Muchas gracias por su compra!</h2>
      <h3 className={styles.msjQR}>
        Puedes compartir tu perfil de usuario con el siguiente código QR:
      </h3>
      <div className={styles.qrContainer}>
      <img src={Qr} id='qr_code' className={styles.codigoQR} alt='Código QR' />
      </div>
      <h3>
        Se le enviará un mail al correo {email} con los pasos a seguir para
        recibir su compra
      </h3>
    </div>
  )
}
