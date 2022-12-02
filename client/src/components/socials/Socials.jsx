import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../redux/actions";
import igLogo from "../../Logo/instagram.png";
import twLogo from "../../Logo/twitter.png";
import linkedinLogo from "../../Logo/linkedin.png";
import fbLogo from "../../Logo/facebook.png";
import styles from "./Socials.module.css";
import { useState } from "react";

export default function Socials() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const userDB = useSelector((state) => state.userDB);
  console.log("usuarioDB: ", userDB);

  const [socials, setSocials] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  useEffect(() => {
    dispatch(getUser(email));
    if (!userDB.hasOwnProperty("socials")) setSocials(userDB.socials);
  }, [dispatch]);

  

  return (
    <div>
      <div className={styles.container}>
        {socials?.instagram.length > 0 ? (
          <div className={styles.igDiv}>
            <a
              href={`http://www.instagram.com/${socials.instagram}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={igLogo} alt="Instagram link" />
            </a>
          </div>
        ) : (
          <></>
        )}

        {socials?.twitter.length > 0 ? (
          <div className={styles.twDiv}>
            <a
              href={`http://www.twitter.com/${socials.twitter}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={twLogo} alt="Twitter link" />
            </a>
          </div>
        ) : (
          <></>
        )}

        {socials?.linkedin.length > 0 ? (
          <div className={styles.liDiv}>
            <a
              href={`http://www.linkedin.com//in/${socials.linkedin}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={linkedinLogo} alt="LinkedIn link" />
            </a>
          </div>
        ) : (
          <></>
        )}

        {socials?.facebook.length > 0 ? (
          <div className={styles.fbDiv}>
            <a
              href={`http://www.facebook.com/${socials.facebook}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={fbLogo} alt="Facebook link" />
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
