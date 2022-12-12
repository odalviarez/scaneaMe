import React, { useState, useEffect } from "react";

const UserOrders = ({order}) => {
console.log(order);
//let items = JSON.parse(order.cartItems);
  return (
    <div>
      <h2>Order ID: {order.id}</h2>
      {/* {items.cartItems.map((elem, index) => {
        return (
          <div>
            <p>Product: {elem.products[index].description}</p>
            <p>size: {elem.cartItems.size}</p>
            <p>total: {elem.cartItems.cartTotalQuantity}</p>
          </div>
        );
      })} */}

    </div>
  );
};

export default UserOrders;
