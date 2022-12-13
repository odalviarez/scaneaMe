import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogin, userGetOrders } from '../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'
import OrderCard from "./OrderCard";
import {getAllProducts} from "../../redux/actions";

const UserPurComp = () => {
    const {user} = useAuth0()
    const dispatch = useDispatch()
    const userOrders = useSelector(state => state.userOrders)
    const productsOnStore = useSelector((state) => state.allProducts);

    useEffect(() => {
        dispatch(getUserLogin(user))
        dispatch(userGetOrders(user.email))
        if (productsOnStore.length === 0) {
            dispatch(getAllProducts());
        }

    }, [dispatch, user, productsOnStore])

    console.log('userOrders: ', userOrders);

    return (
        <div>
            <h1>User Purchases</h1>
            {userOrders.length && productsOnStore.length? userOrders.map(order => {
                return (
                    <OrderCard 
                    id={order._id} 
                    key={order._id} 
                    cart={order.cartItems}
                    date={order.createdAt}
                    productsOnStore={productsOnStore}
                    />
                )
            })
            : "No orders were found"}
        </div>
    );
}

export default UserPurComp;
