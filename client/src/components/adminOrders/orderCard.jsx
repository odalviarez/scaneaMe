import React, {useState, useEffect} from 'react'
import styles from "./orderCard.module.css";
import { adminUpdateOrders } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import cart from '../../Logo/cart.png'
import emailjs, { init } from '@emailjs/browser'

const OrderCard = ({orderId, userEmail, date, paymentStatus, deliveryStatus, cartItems, shippingInfo, cartJSON, productsOnStore, order}) => {

    const dispatch = useDispatch()

    const formatDate = (dateString) => {
        let onlyDate = dateString.split('T')[0].split('-')
        let day = (onlyDate[2])
        let month = (onlyDate[1])
        let year = (onlyDate[0])
        let formattedDate = day + "/" + month + "/" + year
        return formattedDate;
    }
    
    const handleDeliveryStatus = (e) => {
        e.preventDefault()
        let deliveryStatus = e.target.value
        dispatch(adminUpdateOrders(orderId, deliveryStatus))
        if (e.target.value === 'delivered') {
            sendEmail()
        }
    }

    console.log(order);

    const sendEmail = () => {
        let prodAndQty = order?.products.map(e => ({
            item: e.description,
            quantity: e.quantity,
        }))
    
        let amount = `$${order?.total / 100}`
        let name = order?.shipping.name
        let adress = `${order?.shipping.address?.country}, ${order?.shipping.address?.state}, ${order?.shipping.address?.city}, ${order?.shipping.address?.line1}`
    
        let purchaseText = ''
        prodAndQty?.map(e => {
            purchaseText = purchaseText.concat(`${e.quantity} ${e.item}, `)
        })
        console.log('Purchase text: ', purchaseText)
    
        let emailFields = {
            to_name: name,
            to_email: userEmail,
            products: purchaseText,
            amount: amount,
            name: name,
            adress: adress,
        }
    
        console.log('email fields: ', emailFields)
        emailjs.send('service_0hpnim5', 'template_7cgjln7', emailFields, 'vGQTOpiT1rYKFB3ox').then(
            response => {
            console.log('SUCCESS!', response)
            },
        error => {
            console.log('FAILED...', error)
            }
        )
    }

    

    return (
        <div className={styles.orderCardContainer} >  

            <div className={styles.orderCardOrderId}>
                <p>{orderId}</p>
            </div>

            <div className={styles.orderCardEmail}>
                <p>{userEmail}</p>
            </div>

            <div className={styles.orderCardDate}>
                <p>{formatDate(date)}</p>
            </div>

            <div className={styles.orderCardPayment}>
                <p>{paymentStatus}</p>
            </div>

            <div className={styles.orderCardDelivery}>
                {deliveryStatus && <select defaultValue={deliveryStatus} onChange={(e) => handleDeliveryStatus(e)} id='delivery'>
                    <option value='pending' >Pending</option>
                    <option value='delivered' >Delivered</option>
                    <option value='cancelled' >Cancelled</option>
                </select>}
            </div>

            <div className={styles.orderCardDetails}>
                <Link       
                state={{
                    orderId,
                    userEmail,
                    date: formatDate(date),
                    paymentStatus,
                    deliveryStatus,
                    shippingInfo,
                    cartJSON,
                    productsOnStore,
                }}

                to={`/dashboard/adminOrders/${orderId}`}
                >
                    <img src={cart} />
                </Link>
            </div>

        </div>
    );
}

export default OrderCard;
