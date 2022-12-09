import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogin, userGetOrders } from '../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'

const UserPurComp = () => {

    const { user} = useAuth0()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const userOrders = useSelector(state => state.userOrders)

    useEffect(() => {
        dispatch(getUserLogin(user))
        dispatch(userGetOrders(user.email))

    }, [dispatch, user])



    return (
        <div>
            <h1>User Purchases</h1>
            {userOrders.length? userOrders.map((order) => {
                return (
                <p>{order}</p>
                )
            })
            : "No orders were found"}
        </div>
    );
}

export default UserPurComp;
