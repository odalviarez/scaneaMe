import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetOrders } from '../../redux/actions'


const OrderDetail = () => {
    const dispatch = useDispatch()
    const allOrders = useSelector(state => state.allOrders)


    const orderLoaded = useSelector(state => state.orders)

    useEffect(() => {
        if (allOrders.length === 0){
        dispatch(adminGetOrders())
        }
        console.log(allOrders);
    }, [dispatch, allOrders.length])


    
    return (
        <div>
            
        </div>
    );
}

export default OrderDetail;
