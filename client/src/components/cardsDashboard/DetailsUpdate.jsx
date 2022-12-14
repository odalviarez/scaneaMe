import "./detailsUpdate.css";
import i18n from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, updateProduct } from "../../redux/actions.js";
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../redux/actions.js";
import styled from "styled-components";


export default function DetailsUpdate({ id }) {
  const dispatch = useDispatch();

  // const { getAccessTokenSilently } = useAuth0();
  // const getToken = async () => {
  //   const token = await getAccessTokenSilently();
  //   return `${token}`;
  // };

  const [productImg, setProductImg] = useState("");
  const [input, setInput] = useState({
    name: "",
    type: "",
    color: "",
    season: "",
    image: "",
    price: "",
    stock: [],
  });
  
  const [stock, setStock] = useState([]);
  
  const handlePropChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const createStockArray = (e) => {
    e.preventDefault();
    let stockEdit = [...stock];
    if(e.target.value >= 0) stockEdit[e.target.name].quantity = e.target.value;
    setStock(stockEdit);
  };
  const product = useSelector((state) => state.productDetail);
  useEffect(() => {
    if (!product) dispatch(getProductDetails(id));
    setInput({
      name: product.name,
      type: product.type,
      color: product.color,
      season: product.season,
      image: product.image,
      price: product.price,
    });
    if(!stock?.length)setStock(product.stock);
    if (!productImg || productImg !== product.image)
      setProductImg(product.image);
  }, [dispatch, id, product, stock, productImg]);
  
  useEffect(() => {
    return () => {
      dispatch(getAllProducts());
      setProductImg("");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg(product.image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    dispatch(
      updateProduct(
        id,
        {
          ...input,
          image: productImg,
          stock,
        }
        //getToken
      )
    );
  };

  return (
    <div>
      <StyledCreateProduct>
        <StyledForm onSubmit={handleSubmit}>
          <h3>Update Product</h3>
          <input
            id="imgUpload"
            accept="image/*"
            type="file"
            onChange={handleProductImageUpload}
          />
          <select value={input.color} onChange={handlePropChange} required>
            <option value="">{i18n.t("dashboard.select-color")}</option>
            <option value="red">{i18n.t("header.red")}</option>
            <option value="blue">{i18n.t("header.blue")}</option>
            <option value="white">{i18n.t("header.white")}</option>
            <option value="black">{i18n.t("header.black")}</option>
            <option value="yellow">{i18n.t("header.yellow")}</option>
            <option value="green">{i18n.t("header.green")}</option>
            <option value="gray">{i18n.t("Gray")}</option>
          </select>
          <input
            type="text"
            required
            name="name"
            placeholder={input.name}
            value={input.name}
            onChange={handlePropChange}
          />
          <select
            value={input.type}
            onChange={handlePropChange}
            name="type"
            required
          >
            <option value="">{i18n.t("dashboard.select-type")}</option>
            <option value="shirt">{i18n.t("header.t-shirt")}</option>
            <option value="pants">{i18n.t("header.pants")}</option>
            <option value="trunks">{i18n.t("header.trunks")}</option>
          </select>
          <select
            value={input.season}
            onChange={handlePropChange}
            name="season"
            required
          >
            <option value="allyear">{i18n.t("dashboard.select-season")}</option>
            <option value="allyear">{i18n.t("header.all-year")}</option>
            <option value="fall">{i18n.t("header.fall-winter")}</option>
            <option value="spring">{i18n.t("header.spring-summer")}</option>
          </select>
          <input
            type="number"
            required
            name="price"
            value={input.price}
            placeholder={input.price}
            onChange={handlePropChange}
          />
          <div>
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[0]?.quantity : ""}
              value={stock?.length ? stock[0]?.quantity : ""}
              name="0"
              onChange={createStockArray}
            />
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[1]?.quantity : ""}
              value={stock?.length ? stock[1]?.quantity : ""}
              name="1"
              onChange={createStockArray}
            />
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[2]?.quantity : ""}
              value={stock?.length ? stock[2]?.quantity : ""}
              name="2"
              onChange={createStockArray}
            />
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[3]?.quantity : ""}
              value={stock?.length ? stock[3]?.quantity : ""}
              name="3"
              onChange={createStockArray}
            />
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[4]?.quantity : ""}
              value={stock?.length ? stock[4]?.quantity : ""}
              name="4"
              onChange={createStockArray}
            />
            <input
              type="number"
              required
              placeholder={stock?.length ? stock[5]?.quantity : ""}
              value={stock?.length ? stock[5]?.quantity : ""}
              name="5"
              onChange={createStockArray}
            />
          </div>
          {/* <button onClick={(e) => createStockArray(e)}>
            {i18n.t("dashboard.load-stock")}
          </button> */}

          <button type="submit">{i18n.t("dashboard.submit")}</button>
        </StyledForm>
        <ImagePreview>
          {productImg ? (
            <>
              <img src={productImg} alt="product!" />
            </>
          ) : product.image ? (
            <>
              <img src={product.image} alt="product!" />
            </>
          ) : (
            <p>{i18n.t("dashboard.image-preview-will-appear-here")}</p>
          )}
        </ImagePreview>
      </StyledCreateProduct>
    </div>
  );
}

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
