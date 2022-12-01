import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../useLocalStorage";
import {  filterProducts,  getAllProducts,  loadAllProducts,  sortProducts,} from "../../redux/actions";
import style from "./UserAccComp.module.css"

export default function UserAccComp() {

    const userDB = useSelector((state) => state.userDB )

    return (
        <div className={style.UserAccCompContainer}>
            <h1>User Account Info</h1>

            <div className={style.UserAccCompItem}> 
                <label>Email:</label>
                <input type="email" value={userDB.email}/>
            </div>
            <form className={style.UserAccCompItem}> 
                <label>Change Email:</label>
                <input type="email"/>
                <button type="submit">SUBMIT</button>
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

            <form >
            <div className={style.UserAccCompItem}>
                <label>Instagram:</label>
                <input type="text" value={userDB.socials.instagram} />
            </div>
            <div className={style.UserAccCompItem}>
                <label>Facebook:</label>
                <input type="text" value={userDB.socials.facebook}/>

            </div>
            <div className={style.UserAccCompItem}>
                <label>LinkedIn:</label>
                <input type="text"  value={userDB.socials.linkedin}/>

            </div>
            <div className={style.UserAccCompItem}>
                <label>Twitter:</label>
                <input type="text"  value={userDB.socials.twitter}/>
                <button type="text">SUBMIT</button>
            </div>
            </form>

            <button> DELETE ACCOUNT </button>
            
        </div>
    )

}