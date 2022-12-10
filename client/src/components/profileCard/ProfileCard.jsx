import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getUser } from '../../redux/actions'
import Socials from '../socials/Socials'
import styles from './ProfileCard.module.css'
import imgPlaceholder from '../../Logo/imgPlaceholder.png'
import { useState } from 'react'
import UserDisable from '../userDisable/UserDisable'

export default function ProfileCard() {
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium saepe enim, animi tempore nemo nihil quas distinctio nulla commodi molestiae in quisquam consequatur, praesentium eum quidem ullam laborum tempora quo!'

  const dispatch = useDispatch()
  const { email } = useParams()
  const userDB = useSelector(state => state.userDB)
  // const [userImg, setUserImg] = useState(imgPlaceholder)
  const [socials, setSocials] = useState({
    facebook: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  })

  useEffect(() => {
    if (!userDB.hasOwnProperty('socials')) dispatch(getUser(email))
    setSocials(userDB.socials)

  }, [dispatch, userDB]);


  return (
    <div>
      {userDB.isActive ? (
        <div className={styles.container}>
          <img
            key={Date.now()}
            src={userDB? userDB.image.url : imgPlaceholder}
            className={styles.userImg}
            alt='User'
          />
          <div className={styles.descriptionSocials}>
            <div className={styles.description}>{userDB? userDB.info : ''}</div>
            <div className={styles.socialsContainer}>
              {socials ? (
                <Socials
                  facebook={socials.facebook}
                  instagram={socials.instagram}
                  twitter={socials.twitter}
                  linkedin={socials.linkedin}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <UserDisable user={userDB} />
      )}
    </div>
  )
}
