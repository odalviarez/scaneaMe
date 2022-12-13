import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { productDelete } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function CardDelete({
  name,
  img,
  id,
  price,
  type,
  color
}) {
  const { getAccessTokenSilently } = useAuth0();
  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return `${token}`;
  };
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={img} alt="imagen" />
      </div>

      {/* <Link to={`/products/${id}`} className={styles.title}> */}
        {name}
      {/* </Link> */}
      <p>${price}</p>
      <p>{color}</p>
      <button
        value={id}
        onClick={() => {
          dispatch(productDelete(id, getToken));
        }}
        className="close"
      >
        Delete
      </button>
    </div>
  );
}
