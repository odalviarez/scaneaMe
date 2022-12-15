import { useState, useEffect } from "react";
import styles from "./OrderProductCardAdmin.module.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProductComments } from "../../redux/actions";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};

export default function OrderProductCard({id, img, name, color, size, quantity, productsOnStore, price}) {


    return (
              <div className={styles.OrderCardProduct} >
                <div className={styles.OrderCardImage}>
                  <img
                    src={img}
                    alt={img}
                  />
                </div>


                <div className={styles.OrderCardDetails}>
                  <p>{name}</p>
                  <p>Color: {color}</p>
                  <p>Size: {size} x {quantity} unit</p>
                  <p>Price: $ {price} unit</p>
                </div>

              </div>
            );
}

