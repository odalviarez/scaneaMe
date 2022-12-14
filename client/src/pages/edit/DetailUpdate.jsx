import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductDetails } from "../../redux/actions";
import Details from "../../components/cardsDashboard/DetailsUpdate.jsx";

export default function Detail() {
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const { name, type, color, price, stock } = productDetail;
console.log(productDetail);
  return (
    <div style={{ minHeight: "80vh" }}>
      <Details
        name={name}
        type={type}
        color={color}
        price={price}
        id={id}
        key={id}
        stock={stock}
      />
    </div>
  );
}
