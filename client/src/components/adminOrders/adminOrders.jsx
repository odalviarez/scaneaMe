import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetOrders } from '../../redux/actions'
import OrderCard from './orderCard'
import styles from "./adminOrders.module.css"
import Pagination from '../pagination/Pagination'

const AdminOrders = () => {
    const dispatch = useDispatch()
    const allOrders = useSelector(state => state.allOrders)
    const ordersLoaded = useSelector(state => state.orders)

    useEffect(() => {
        if (allOrders.length === 0){
        dispatch(adminGetOrders())
        }
        console.log(allOrders);
    }, [dispatch, allOrders.length])

        //* PAGINADO
    const [currentPage, setcurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const pagination = (pageNumber) => {
        setcurrentPage(pageNumber);
    };
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = ordersLoaded.slice(indexOfFirstCard, indexOfLastCard);
    
    return (
<div className={styles.adminOrdersContainer}>
            <div>
                <h1>Admin Orders</h1>
            </div>
                <div className={styles.adminOrdersHeaders} >
                    <div className={styles.adminOrderImage}>
                        <p>OrderID</p>
                    </div>
                    <div className={styles.adminOrderEmail}>
                        <p>User Email</p>
                    </div>
                    <div className={styles.adminOrderId}>
                        <p>Created</p>
                    </div>
                    <div className={styles.adminOrderCreatedAt}>
                        <p>Payment</p>
                    </div>
                    <div className={styles.adminOrderIsActive}>
                        <p>Delivery</p>
                    </div>
                    <div className={styles.adminOrderIsAdmin}>
                        <p>Details</p>
                    </div>
                </div>
            <div className={styles.adminOrdersCards}>
                {ordersLoaded.length? currentCards.map(order => {
                    return (
                        <OrderCard
                            orderId= {order._id}
                            key={order._id}
                            userEmail={order.email}
                            date={order.createdAt}
                            paymentStatus={order.payment_status}
                            deliveryStatus={order.delivery_status}
                            details={order.cartItems}
                        />
                    )
                }) : 'No orders were found'}
            </div>
            <div className={styles.adminOrderPagination}>
                <Pagination
                cardsPerPage={cardsPerPage}
                cardsTotal={ordersLoaded.length}
                pagination={pagination}
                currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default AdminOrders;
