import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, getUserLogin } from "../../redux/actions";
import style from "./UserAccComp.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserAccComp() {
    const { user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState("");
  const [socials, setSocials] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });
  
  useEffect(() => {
    if (user) dispatch(getUserLogin(user.email));
    if (userLogin.hasOwnProperty("socials")) setSocials(userLogin.socials);
  }, [dispatch]);



  console.log(userLogin);


  const handleChangeSocials = (e) => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitSocials = async (e) => {
    e.preventDefault(e);
    console.log("nuevas socials:", socials);

    dispatch(
      userUpdate(
        {
          socials,
        },
        userLogin.email
      )
    );
  };

  return (
    <div className={style.UserAccCompContainer}>
      <h1>User Account Info</h1>

      <div className={style.UserAccCompItem}>
        <label>Email:</label>
        <input type="email" value={userLogin.email} />
      </div>
      <form className={style.UserAccCompItem}>
        <label>Change Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">SUBMIT</button>
      </form>
      <form>
        <div className={style.UserAccCompItem}>
          <label>New password:</label>
          <input type="password" />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Repeat password:</label>
          <input type="password" />
          <button type="submit">SUBMIT</button>
        </div>
      </form>

      <form onSubmit={(e) => handleSubmitSocials(e)}>
        <div className={style.UserAccCompItem}>
          <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={socials.instagram}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.instagram}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={socials.facebook}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.facebook}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={socials.linkedin}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.linkedin}
          />
        </div>
        <div className={style.UserAccCompItem}>
          <label>Twitter:</label>
          <input
            type="text"
            name="twitter"
            value={socials.twitter}
            onChange={handleChangeSocials}
            placeholder={userLogin?.socials?.twitter}
          />
          <button type="text">SUBMIT</button>
        </div>
      </form>

      <button> DELETE ACCOUNT </button>
    </div>
  );
}
