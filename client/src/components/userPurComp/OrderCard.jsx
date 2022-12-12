
import React from "react";
import styles from "./OrderCard.module.css";

export default function OrderCard({id, cart, date, productsOnStore}) {

    const ordersObject = (carts) => {
        let cartsTotal = JSON.parse(carts)
        return (cartsTotal);
    }

    const getProductDetails = (productId) => {
        let product = productsOnStore.find(product => product.id === productId)
        return product
    }
    
    const formatDate = (dateString) => {
        let onlyDate = dateString.split('T')[0].split('-')
        let day = (onlyDate[2])
        let month = (onlyDate[1])
        let year = (onlyDate[0])
        let formattedDate = day + "/" + month + "/" + year
        return formattedDate;
    }

    return (
    <div >
        <h4>Purchase ID: {id}</h4>
        <p>Date: {formatDate(date)}</p>
        {ordersObject(cart).map(item => {
            return (
                <div key={item.id}>
                    <div className={styles.imageContainer}>
                        <img  src={getProductDetails(item.id).image}/>
                    </div>
                    <p>{getProductDetails(item.id).name}</p>
                    <p>Color {getProductDetails(item.id).color}</p>
                    <p>Size {item.size} x {item.cartTotalQuantity} unit</p>

                </div>
            )
        })}
    </div>
  )
}
