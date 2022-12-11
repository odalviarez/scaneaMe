import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate, getUserLogin, getUser, userUpdateAuth0 } from '../../redux/actions'
import style from './UserAccComp.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import validator from 'validator';
import tlds from 'tld-list'
var passwordValidator = require('password-validator');



export default function UserAccComp() {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ 
    email: "",
    password: [],
    passwordRepeat: ""
  })
  const [image, setImage] = useState('')
    // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [aboutUser, setAboutUser] = useState('')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user])

  useEffect(() => {
    return () => {
      dispatch(getUser(userLogin.email))
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  


  const validateEmail = (e) => {
    e.preventDefault(e)
  
    if (validator.isEmail(email, {domain_specific_validation: true}) === false || tlds.includes(email.split('.').pop()) === false) {
      setErrors({
        ...errors,
        email : 'Email is not valid'
    })} else if (errors.email.length === 0) {
      
      dispatch(userUpdateAuth0(email, userLogin.sub, 'emailChange', getToken))
    }
  }

  

  let schema = new passwordValidator();
  schema.is().min(8, 'Password must be at least 8 characters long')
  schema.is().max(20, 'Password must be less than 20 characters long')
  schema.has().uppercase(1, 'Password must have at least 1 uppercase letter')
  schema.has().lowercase(1, 'Password must have at least 1 lowercase letter')
  schema.has().digits(1, 'Password must have at least 1 number')
  schema.has().symbols(1, 'Password must have at least 1 special character')
  schema.has().not().spaces(1, 'Password must not have spaces')


  const validatePassword = async (e) => {
    e.preventDefault(e)

    if (password !== passwordRepeat) {
      setErrors({
        ...errors,
        password : schema.validate(password, {'details': true}).map(e => e.message),
        passwordRepeat : 'Passwords do not match'
      })} else {
      setErrors({
        ...errors,
        password : schema.validate(password, {'details': true}).map(e => e.message),
        passwordRepeat : '',
      })
      }

    if (errors.password.length === 0 && errors.passwordRepeat.length === 0) {
      
      dispatch(userUpdateAuth0(password, userLogin.sub, 'passwordChange', getToken))
    }
  }


  const handleChangeSocials = e => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitProfile = async (e) => {
    e.preventDefault(e)

    dispatch(
      userUpdate(
        {
          socials,
          image,
          aboutUser,
        },
        userLogin.email,
        getToken
      )
    )
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault(e)
    

  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (file.size < 10000000) {
    setFileToBase(file)
    } else {
      alert ('El tamaño de la imágen no debe superar los 10mb')
    }
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
          <input type='email' value={userLogin?.email} disabled />
        </div>
        <form onSubmit={e => validateEmail(e)} className={style.UserAccCompItem} >
          <label>Change Email:</label>
          <input type='email' onChange={e => setEmail(e.target.value)} />
          <button type='submit'>SUBMIT</button>
        </form>
        {errors.email? (<p>{errors.email}</p>) : "" }
        <form onSubmit={e => validatePassword(e)}>
          <div className={style.UserAccCompItem}>
            <label>New password:</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          {errors.password?.map(e => {
            return (<p key={e}>{e}</p>)})}
          <div className={style.UserAccCompItem}>
            <label>Repeat password:</label>
            <input type='password' value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
            <button type='submit'>SUBMIT</button>
          </div>
            {errors.passwordRepeat? (<p>{errors.passwordRepeat}</p>) : "" }
        </form>
      </div>
    
      : 

      <div> 
        <div className={style.UserAccCompItem}>
          <label>Email:</label>
          <input type='email' value={userLogin?.email} disabled />
        </div>
      </div>
      }


      <form onSubmit={e => handleSubmitProfile(e)}>
        <div className={style.UserAccCompAbout}>
          <label>About me:</label>
          <textarea 
          type='text' 
          maxLength="255"
          rows='5'
          placeholder={userLogin.info && userLogin.info}
          value={aboutUser} 
          onChange={(e) => setAboutUser(e.target.value)}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Instagram:</label>
          <input
            type='text'
            name='instagram'
            value={socials?.instagram}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.instagram}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Facebook:</label>
          <input
            type='text'
            name='facebook'
            value={socials?.facebook}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.facebook}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>LinkedIn:</label>
          <input
            type='text'
            name='linkedin'
            value={socials?.linkedin}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.linkedin}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Twitter:</label>
          <input
            type='text'
            name='twitter'
            value={socials?.twitter}
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
            accept=".png, .jpg, .jpeg"
            className={style.imgUpload}
            placeholder='Select file...'
          />
        </div>
        <button
          type='text'
          className={style.submitProfile}
        >
          SUBMIT
        </button>
      </form>
      <button className={style.submitProfile} onClick={handleDeleteAccount}> DELETE ACCOUNT </button>
    </div>
  )
}
