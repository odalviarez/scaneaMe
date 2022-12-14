import React, {useState, useEffect} from 'react'
import styles from "./orderCard.module.css";
import { adminUpdateOrders } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import cart from '../../Logo/cart.png'

const OrderCard = ({orderId, userEmail, date, paymentStatus, deliveryStatus, details}) => {

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
        console.log('front', orderId, deliveryStatus);
        dispatch(adminUpdateOrders(orderId, deliveryStatus))
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
                filter:'season',
                value:'spring',
                valor:'Primavera / Verano'
                }}
                >
                <img src={cart} />
                </Link>
            </div>

        </div>
    );
}

export default OrderCard;
