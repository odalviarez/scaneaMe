    import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OrderProductCardAdmin from './OrderProductCardAdmin'
import styles from './orderDetail.module.css'


const OrderDetail = () => {
    let location = useLocation()
    let navigate  = useNavigate();

    const ordersObject = (cart) => {
        let cartsTotal = JSON.parse(cart)
        return(cartsTotal);
    }

    const getProductDetails = (productId) => {
        let product = location.state.productsOnStore.find(product => product.id === productId)
        return product
    }
    



    return (
        <div className={styles.OrderDetailContainer}> 
            <h1>Order Detail</h1>
        <button className={styles.orderDetailsBack} onClick={() => navigate(-1)}>BACK</button>

            <div className={styles.OrderDetailInputsContainer}>
                <div className={styles.OrderDetailInput}>
                    <h4>User Email:</h4>
                    <p>{location.state.userEmail}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Purchase date:</h4>
                    <p>{location.state.date}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Payment status:</h4>
                    <p>{location.state.paymentStatus}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Delivery status:</h4>
                    <p>{location.state.deliveryStatus}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Shipping email:</h4>
                    <p>{location.state.shippingInfo.email}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Shipping name:</h4>
                    <p>{location.state.shippingInfo.name}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Shipping phone:</h4>
                    <p>{location.state.shippingInfo.phone}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h4>Tax exemp:</h4>
                    <p>{location.state.shippingInfo.tax_exempt}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h3>Shipping information:</h3>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>City:</h5>
                    <p>{location.state.shippingInfo.address.city}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>Country:</h5>
                    <p>{location.state.shippingInfo.address.country}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>Line 1:</h5>
                    <p>{location.state.shippingInfo.address.line1}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>Line 2:</h5>
                    <p>{location.state.shippingInfo.address.line2}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>Postal Code:</h5>
                    <p>{location.state.shippingInfo.address.postal_code}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h5>State:</h5>
                    <p>{location.state.shippingInfo.address.state}</p>
                </div>

                <div className={styles.OrderDetailInput}>
                    <h3>Products:</h3>
                </div>

                <div className={styles.OrderCardProducts}>
                    {ordersObject(location.state.cartJSON).map(item => {
                        return (
                        <OrderProductCardAdmin
                            key={item.id}
                            id={item.id}
                            img={getProductDetails(item.id)?.image}
                            name={getProductDetails(item.id)?.name}
                            color={getProductDetails(item.id)?.color}
                            price={getProductDetails(item.id)?.price}
                            size={item.size}
                            quantity={item.cartTotalQuantity}
                            productsOnStore={location.state.productsOnStore}
                        />)
                    })}
                </div>

            </div>
        </div>
    );
}

export default OrderDetail;
