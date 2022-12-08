import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate, getUserLogin } from '../../redux/actions'
import style from './UserAccComp.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import validator from 'validator';
import tlds from 'tld-list'
import configJson from "../../auth_config.json";
import axios from "axios";


export default function UserAccComp() {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin);
  console.log(userLogin);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ 
    email: "",
    password: []
  })
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')
  const [socials, setSocials] = useState({
    facebook: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  })

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return `${token}`;
  };

  useEffect(() => {
    dispatch(getUserLogin(user));
    if (userLogin.hasOwnProperty('socials')) setSocials(userLogin.socials)
  }, [dispatch, user])


  
  const validateEmail = (email) => {
  
    if (validator.isEmail(email, {domain_specific_validation: true}) === false || tlds.includes(email.split('.').pop()) === false) {
      errors.email = 'Invalid Email'      
    } 
  
    return errors
  }

  // eslint-disable-next-line no-unused-vars
  const validatePassword = (password) => {
  
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'      
    } 
  
    return errors
  }



  const handleChangeSocials = e => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitSocials = async (e) => {
    e.preventDefault(e)
    console.log('nuevas socials:', socials)

    dispatch(
      userUpdate(
        {
          socials,
          image,
        },
        userLogin.email,
        getToken
      )
    )
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault(e)
    console.log(email);
    validateEmail(email) 
    if (errors.email !== "") {

      var options = {
        method: 'PATCH',
        url: `https://${configJson.domain}/api/v2/users/${user.id}`,
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer {yourMgmtApiAccessToken}' //! FALTA COMPLETAR
        },
        data: {email: email, connection: 'changedEmail'}
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
  
    }
  }
  

  const handleImage = e => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  return (
    <div className={style.UserAccCompContainer}>
      <h1>User Account Info</h1>

      {userLogin?.sub?.includes('auth0')? 
      
      <div> 
        <div className={style.UserAccCompItem}>
          <label>Email:</label>
          <input type='email' value={userLogin.email} disabled />
        </div>
        <form className={style.UserAccCompItem} onSubmit={(e) => handleSubmitEmail(e)}>
          <label>Change Email:</label>
          <input type='email' onChange={e => setEmail(e.target.value)} />
          <button type='submit'>SUBMIT</button>
        </form>
        <form>
          <div className={style.UserAccCompItem}>
            <label>New password:</label>
            <input type='password' />
          </div>
          <div className={style.UserAccCompItem}>
            <label>Repeat password:</label>
            <input type='password' />
            <button type='submit'>SUBMIT</button>
          </div>
        </form>
      </div>
    
      : 

      <div> 
        <div className={style.UserAccCompItem}>
          <label>Email:</label>
          <input type='email' value={userLogin.email} disabled />
        </div>
      </div>
      }


      <form onSubmit={e => handleSubmitSocials(e)}>
        <div className={style.UserAccCompItem}>
          <label>Instagram:</label>
          <input
            type='text'
            name='instagram'
            value={socials.instagram}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.instagram}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Facebook:</label>
          <input
            type='text'
            name='facebook'
            value={socials.facebook}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.facebook}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>LinkedIn:</label>
          <input
            type='text'
            name='linkedin'
            value={socials.linkedin}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.linkedin}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Twitter:</label>
          <input
            type='text'
            name='twitter'
            value={socials.twitter}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.twitter}
          />
        </div>

        <div className={style.imgUpContainer}>
          <div>Update Image:</div>
          <input
            onChange={handleImage}
            type='file'
            id='formupload'
            name='image'
            className={style.imgUpload}
            placeholder='Select file...'
          />
        </div>
        <button type='text' className={style.submitProfile}>
          SUBMIT
        </button>
      </form>
      <button className={style.submitProfile}> DELETE ACCOUNT </button>
    </div>
  )
}
