import OrderProductCard from "./OrderProductCard"
import styles from "./OrderCard.module.css";



export default function OrderCard({id, cart, date, productsOnStore, totalPrice, delivery}) {

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
    <div className={styles.OrderCardContainer} >
      <div className={styles.OrderCardHeader}>
        <h4>Purchase ID: {id}</h4>
        <p>Date: {formatDate(date)}</p>
      </div>
      <div className={styles.OrderCardProducts}>
        {ordersObject(cart).map(item => {
            return (
              <OrderProductCard
                key={item.id}
                id={item.id}
                img={getProductDetails(item.id)?.image}
                name={getProductDetails(item.id)?.name}
                color={getProductDetails(item.id)?.color}
                size={item.size}
                quantity={item.cartTotalQuantity}
                productsOnStore={productsOnStore}
              />)
        })}
      </div>
      <div className={styles.OrderCardFooter} >
        <p>Delivery status: {delivery}</p>
        <h4>TOTAL: ${totalPrice / 100}</h4>
      </div>
    </div>
  )
}
