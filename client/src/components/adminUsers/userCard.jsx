import React from 'react'
import styles from "./userCard.module.css";
import profilePic from "../../Logo/profile.png"
import { userUpdateAuth0, adminMakeAdmin} from '../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'


const UserCard = ({email, id, image, isActive, isAdmin, createdAt, sub}) => {

    const { getAccessTokenSilently } = useAuth0()
    const dispatch = useDispatch()


    const formatDate = (dateString) => {
        let onlyDate = dateString.split('T')[0].split('-')
        let day = (onlyDate[2])
        let month = (onlyDate[1])
        let year = (onlyDate[0])
        let formattedDate = day + "/" + month + "/" + year
        return formattedDate;
    }

    const getToken = async () => {
        const token = await getAccessTokenSilently();
        return `${token}`;
    };

    const deactivateUser = async (e) => {
        e.preventDefault(e)
        dispatch(userUpdateAuth0(null, sub, 'delete', getToken))
        window.location.reload()
    }

    const makeAdmin = async (e) => {
        e.preventDefault(e)
        dispatch(adminMakeAdmin(sub, getToken))
        window.location.reload()
    }

    return (
        <div className={styles.userCardContainer} >  

            <div className={styles.userCardImage}>
                {image.url? <img src={image.url}/> : <img src={profilePic}/>}
            </div>

            <div className={styles.userCardEmail}>
                <p>{email}</p>
            </div>

            <div className={styles.userCardId}>
                <p>ID: {id}</p>
            </div>

            <div className={styles.userCardCreatedAt}>
                <p>{formatDate(createdAt)}</p>
            </div>

            <div className={styles.userCardIsActive}>
                <input id='isActive' onChange={(e) => deactivateUser(e)} checked={isActive} type='checkbox'/>
            </div>

            <div className={styles.userCardIsAdmin}>
                {isAdmin? <input id='isAdmin' checked onChange={(e) => makeAdmin(e)} type='checkbox'/> : <input name='isAdmin' onChange={(e) => makeAdmin(e)}  type='checkbox'/>}
            </div>

        </div>
    );
}

export default UserCard;
