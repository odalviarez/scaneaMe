import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, getUser, userUpdateAuth0, getUserLogin } from "../../redux/actions";
import style from "./UserAccComp.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import validator from "validator";
import tlds from "tld-list";
import Popup from "reactjs-popup";
var passwordValidator = require("password-validator");

export default function UserAccComp() {
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({
    email: "",
    password: [],
    passwordRepeat: "",
  });
  const [image, setImage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [aboutUser, setAboutUser] = useState("");
  const [socials, setSocials] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return `${token}`;
  };

  useEffect(() => {
    if(!userLogin) dispatch(getUserLogin(user.email))
    if (Object.hasOwn(userLogin, "socials") && user) {
    setSocials({
      facebook: userLogin.socials? userLogin.socials.facebook : "",
      linkedin: userLogin.socials? userLogin.socials.linkedin : "",
      twitter: userLogin.socials? userLogin.socials.twitter : "",
      instagram: userLogin.socials? userLogin.socials.instagram : "",
    });
  }

  }, [dispatch, user, userLogin]);

  useEffect(() => {
    return () => {
      dispatch(getUser(userLogin.email));
    };
  }, [dispatch, userLogin.email, socials]);

  const validateEmail = (e) => {
    e.preventDefault(e);

    if (
      validator.isEmail(email, { domain_specific_validation: true }) ===
        false ||
      tlds.includes(email.split(".").pop()) === false
    ) {
      setErrors({
        ...errors,
        email: "Email is not valid",
      });
    } else if (errors.email.length === 0) {
      dispatch(userUpdateAuth0(email, userLogin.sub, "emailChange", getToken));
      alert("User email updated");
    }
  };

  let schema = new passwordValidator();
  schema.is().min(8, "Password must be at least 8 characters long");
  schema.is().max(20, "Password must be less than 20 characters long");
  schema.has().uppercase(1, "Password must have at least 1 uppercase letter");
  schema.has().lowercase(1, "Password must have at least 1 lowercase letter");
  schema.has().digits(1, "Password must have at least 1 number");
  schema.has().symbols(1, "Password must have at least 1 special character");
  schema.has().not().spaces(1, "Password must not have spaces");

  const validatePassword = async (e) => {
    e.preventDefault(e);

    if (password !== passwordRepeat) {
      setErrors({
        ...errors,
        password: schema
          .validate(password, { details: true })
          .map((e) => e.message),
        passwordRepeat: "Passwords do not match",
      });
    } else {
      setErrors({
        ...errors,
        password: schema
          .validate(password, { details: true })
          .map((e) => e.message),
        passwordRepeat: "",
      });
    }

    if (errors.password.length === 0 && errors.passwordRepeat.length === 0) {
      dispatch(
        userUpdateAuth0(password, userLogin.sub, "passwordChange", getToken)
      );
      alert("User password updated");
    }
  };

  const handleChangeSocials = (e) => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault(e);

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
    );
    alert("User information updated");
  };


  const handleDeleteAccount = async (e) => {
    e.preventDefault(e);

    dispatch(userUpdateAuth0(null, userLogin.sub, "delete", getToken));
    window.location.href = window.location.origin + "/home";
  };

  // const deleteSocials = (e) => {
  //   e.preventDefault();
  //   setSocials({
  //     facebook: null,
  //     linkedin: null,
  //     twitter: null,
  //     instagram: null,
  //   });
  //   dispatch(
  //     userUpdate(
  //       {
  //         socials,
  //       },
  //       userLogin.email,
  //       getToken
  //     )
  //   );
  //   alert("User socials deleted")
  // };

  const showPassword = (e) => {
    e.preventDefault(e);
    var x = document.getElementById("passwordInput");
    var y = document.getElementById("passwordInputRepeat");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size < 10000000) {
      setFileToBase(file);
    } else {
      alert("The image file size should be smaller than 10mb");
    }
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const inputStyle= 'bg-inherit appearance-none rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none backdrop-blur-xl bg-white/50 '

  const labelStyle = 'block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'


  const buttonStyle = 'flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded'

  const buttonStyle2='bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
  return(
    <div className={style.UserAccCompContainer}>
      <h1>User Account Info</h1>

      {userLogin?.sub?.includes('auth0')? 
      
      <div> 
        <div className={style.UserAccCompItem}>
          <label className={labelStyle} >Email:</label>
          <input className={inputStyle} type='email' value={userLogin?.email} disabled />
        </div>
        <form onSubmit={e => validateEmail(e)} className={style.UserAccCompItem} >
          <label className={labelStyle}>Change Email:</label>
          <input className={inputStyle} type='email' onChange={e => setEmail(e.target.value)} />
          <button className={buttonStyle} type='submit'>SUBMIT</button>
        </form>
        {errors.email? (<p>{errors.email}</p>) : "" }
        <form onSubmit={e => validatePassword(e)}>
          <div className={style.UserAccCompItem}>
            <label className={labelStyle}>New password:</label>
            <input className={inputStyle} id='passwordInput' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          {errors.password?.map(e => {
            return (<p key={e}>{e}</p>)})}
          <div className={style.UserAccCompItem}>
            <label className={labelStyle}>Repeat password:</label>
            <input className={inputStyle} id='passwordInputRepeat' type='password' value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
            <button className={buttonStyle} type='submit'>SUBMIT</button>
          </div>
          <div className={style.showPassword}>
            <button className={buttonStyle2}  type="checkbox" onClick={(e) => showPassword(e)}>SHOW</button>
          </div>
            {errors.passwordRepeat? (<p>{errors.passwordRepeat}</p>) : "" }
        </form>
      </div>
    
      : 

      <div> 
        <div className={style.UserAccCompItem}>
          <label className={labelStyle}>Email:</label>
          <input className={inputStyle} type='email' value={userLogin?.email} disabled />
        </div>
      </div>
      }


      <form onSubmit={e => handleSubmitProfile(e)}>
        <div className={style.UserAccCompAbout}>
          <label className={labelStyle}>About me:</label>
          <textarea 
          className={inputStyle}
          type='text' 
          maxLength="255"
          rows='5'
          placeholder={userLogin.info && userLogin.info}
          value={aboutUser} 
          onChange={(e) => setAboutUser(e.target.value)}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label className={labelStyle}>Instagram:</label>
          <input className={inputStyle}
            type='text'
            name='instagram'
            value={socials?.instagram}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.instagram}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label className={labelStyle}>Facebook:</label>
          <input className={inputStyle}
            type='text'
            name='facebook'
            value={socials?.facebook}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.facebook}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label className={labelStyle}>LinkedIn:</label>
          <input className={inputStyle}
            type='text'
            name='linkedin'
            value={socials?.linkedin}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.linkedin}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label className={labelStyle}>Twitter:</label>
          <input className={inputStyle}
            type='text'
            name='twitter'
            value={socials?.twitter}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.twitter}
          />
        </div>

        <div className={style.imgUpContainer}>
          <div className={labelStyle}>Update Image:</div>
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
        <div className={style.btnForm}>
          <button
            type='text'
            className={buttonStyle2}
          >
            SUBMIT
          </button>
        </div>
        
      </form>
    <Popup  trigger={<button className={buttonStyle2}>DELETE ACCOUNT</button>} position="right center">
      <div className={style.popupDelete}>
        <p>Delete account? This action cannot be reversed.</p>
        <button className={style.submitProfile} onClick={handleDeleteAccount}> DELETE </button>
      </div>
    </Popup>
    </div>
  )
}

