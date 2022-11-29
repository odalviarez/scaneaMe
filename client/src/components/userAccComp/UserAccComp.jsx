import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../useLocalStorage";
import {  filterProducts,  getAllProducts,  loadAllProducts,  sortProducts,} from "../../redux/actions";
import style from "./UserAccComp.module.css"

export default function UserAccComp() {



    return (
        <div className={style.UserAccCompContainer}>
            <h1>User Account Info</h1>

            <div className={style.UserAccCompItem}> 
                <label>Email:</label>
                <input type="email" value="nombre.apellido@mail.com"/>
            </div>
            <form className={style.UserAccCompItem}> 
                <label>Change Email:</label>
                <input type="email"/>
                <button type="submit">SUBMIT</button>
            </form>
            <div className={style.UserAccCompItem}>
                <label>Password:</label>
                <input type="password" value="123"/>
            </div>
            <form className={style.UserAccCompItem}>
                <label>Change Password:</label>
                <input type="password"/>
                <button type="submit">SUBMIT</button>
            </form>

            <button> DELETE ACCOUNT </button>
            
        </div>
    )

}