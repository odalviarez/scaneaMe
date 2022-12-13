import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetUsers } from '../../redux/actions'
import UserCard from './userCard'
import styles from "./adminUsersComp.module.css"

const UserPurComp = () => {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)

    useEffect(() => {
        dispatch(adminGetUsers())

    }, [dispatch])


    return (
        <div>
            <h1>Admin Users</h1>
            <div className={styles.adminUsersCards}>
                <div className={styles.adminUsersHeaders} >
                <div className={styles.adminUserImage}>
                    <p>Profile</p>
                </div>
                <div className={styles.adminUserEmail}>
                    <p>Email</p>
                </div>
                <div className={styles.adminUserId}>
                    <p>User ID</p>
                </div>
                <div className={styles.adminUserCreatedAt}>
                    <p>Created</p>
                </div>
                <div className={styles.adminUserIsActive}>
                    <p>is Active?</p>
                </div>
                <div className={styles.adminUserIsAdmin}>
                    <p>is Admin?</p>
                </div>
            </div>
                {allUsers.length? allUsers.map(user => {
                    return (
                        <UserCard
                            email= {user.email}
                            key={user._id}
                            id={user._id}
                            image={user.image}
                            isActive={user.isActive}
                            isAdmin={user.isAdmin}
                            createdAt={user.createdAt}
                            sub={user.sub}
                        />
                    )
                }) : 'No users were found'}
            </div>
        </div>
    );
}

export default UserPurComp;
