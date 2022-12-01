import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  userUpdate,} from "../../redux/actions";
import style from "./UserAccComp.module.css"

export default function UserAccComp() {

    const dispatch = useDispatch()
    const userDB = useSelector((state) => state.userDB )
    const [email, setEmail] = useState("");
    const [socials, setSocials] = useState({
        facebook:"",
        linkedin:"",
        twitter:"",
        instagram:"",
    });

    useEffect(() => {
        if (userDB) {
            setSocials(userDB.socials)
        }

    }, []);


    // const handleSubmitEmail = async (e) => {
    //     e.preventdefault()
    //     console.log("nuevo email:", email);

    //     await dispatch(userUpdate({
    //         email
    //     },userDB.email))

    // }
    
    const handleChangeSocials = (e) => {
        console.log(socials);
        setSocials({
            ...socials,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmitSocials = async (e) => {
        e.preventDefault(e)
        console.log("nuevas socials:", socials);

        await dispatch(userUpdate({
            socials
        },userDB.email))

    }



    return (
        <div className={style.UserAccCompContainer}>
            <h1>User Account Info</h1>

            <div className={style.UserAccCompItem}> 
                <label>Email:</label>
                <input type="email" value={userDB.email}/>
            </div>
            <form className={style.UserAccCompItem}> 
                <label>Change Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit" >SUBMIT</button>
            </form>
            <form >
            <div className={style.UserAccCompItem}>
                <label>New password:</label>
                <input type="password"/>
            </div>
            <div className={style.UserAccCompItem}>
                <label>Repeat password:</label>
                <input type="password"/>
                <button type="submit">SUBMIT</button>
            </div>
            </form>

            <form  onSubmit={(e) => handleSubmitSocials(e)}>
            <div className={style.UserAccCompItem}>
                <label>Instagram:</label>
                <input type="text" name="instagram" value={socials.instagram} onChange={handleChangeSocials} placeholder={userDB.socials.instagram}/>
            </div>
            <div className={style.UserAccCompItem}>
                <label>Facebook:</label>
                <input type="text" name="facebook" value={socials.facebook} onChange={handleChangeSocials} placeholder={userDB.socials.facebook}/>

            </div>
            <div className={style.UserAccCompItem}>
                <label>LinkedIn:</label>
                <input type="text" name="linkedin"  value={socials.linkedin} onChange={handleChangeSocials} placeholder={userDB.socials.linkedin}/>

            </div>
            <div className={style.UserAccCompItem}>
                <label>Twitter:</label>
                <input type="text" name="twitter" value={socials.twitter} onChange={handleChangeSocials} placeholder={userDB.socials.twitter}/>
                <button type="text">SUBMIT</button>
            </div>
            </form>

            <button> DELETE ACCOUNT </button>
            
        </div>
    )

}