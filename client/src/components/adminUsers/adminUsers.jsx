import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetUsers } from '../../redux/actions'
import UserCard from './userCard'
import styles from "./adminUsers.module.css"
import Pagination from '../pagination/Pagination'

export default function AdminUsers() {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const usersLoaded = useSelector(state => state.usersLoaded)

    useEffect(() => {
        if (allUsers.length === 0){
        dispatch(adminGetUsers())
        }

    }, [dispatch, allUsers.length])

        //* PAGINADO
    const [currentPage, setcurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const pagination = (pageNumber) => {
        setcurrentPage(pageNumber);
    };
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = usersLoaded.slice(indexOfFirstCard, indexOfLastCard);


    return (
        <div className={styles.adminUsersContainer}>
            <div>
                <h1>Admin Users</h1>
            </div>
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
            <div className={styles.adminUsersCards}>
                {usersLoaded.length? currentCards.map(user => {
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
            <div className={styles.adminUserPagination}>
                <Pagination
                cardsPerPage={cardsPerPage}
                cardsTotal={usersLoaded.length}
                pagination={pagination}
                currentPage={currentPage}
                />
            </div>
        </div>
    );
}


