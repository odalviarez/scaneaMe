import NavBar from '../navBar/NavBar.jsx'
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsCreate } from '../../redux/actions.js';
import styled from "styled-components";

import i18n from '../../i18n'

const CreateComponent = () => {
    const dispatch = useDispatch();
    
    const [productImg, setProductImg] = useState("");
    const [color, setColor] = useState("");
    const [season, setSeason] = useState("allyear");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [stockXS, setStockXS] = useState(0);
    const [stockS, setStockS] = useState(0);
    const [stockM, setStockM] = useState(0);
    const [stockL, setStockL] = useState(0);
    const [stockXL, setStockXL] = useState(0);
    const [stockXXL, setStockXXL] = useState(0);
    const [stock, setStock] = useState([])

    const createStockArray = (e) => {
        e.preventDefault()
        setStock([
            {
                size: "xs",
                quantity: stockXS
            },{            
                size: "s",
                quantity: stockS
            },{            
                size: "m",
                quantity: stockM
            },{            
                size: "l",
                quantity: stockL
            },{            
                size: "xl",
                quantity: stockXL
            },{            
                size: "xxl",
                quantity: stockXXL
            }
        ])
    }

    
    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
    
        TransformFile(file)
    }
    
    const TransformFile = (file)  => {
        const reader = new FileReader();
    
        if(file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProductImg(reader.result);
        };
        } else {
        setProductImg("");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log({
            name,
            color,
            type,
            season,
            price,
            stock,
            image: productImg,
        });
    
        await dispatch(productsCreate({
        name,
        color,
        type,
        season,
        price,
        stock,
        image: productImg,
    })
    );
    };
    
    return (
      <div>
        <StyledCreateProduct>
          <StyledForm onSubmit={handleSubmit}>
          <div>
      <Button as={Link} href="/dashboard/?lng=es">ES</Button>
      <Button as={Link} href="/dashboard/?lng=en">EN</Button>
      <br /> <br />
      </div>
            <h3>{i18n.t("dashboard.create-product")}</h3>
            <input
              id="imgUpload"
              accept="image/*"
              type="file"
              onChange={handleProductImageUpload}
              required
            />
            <select onChange={(e) => setColor(e.target.value)} required>
              <option value="">{i18n.t("dashboard.select-color")}</option>
              <option value="red">{i18n.t("header.red")}</option>
              <option value="blue">{i18n.t("header.blue")}</option>
              <option value="white">{i18n.t("header.white")}</option>
              <option value="black">{i18n.t("header.black")}</option>
              <option value="yellow">{i18n.t("header.yellow")}</option>
              <option value="green">{i18n.t("header.green")}</option>
            </select>
            <input
              type="text"
              required
              placeholder={i18n.t('dashboard.name')}
              onChange={(e) => setName(e.target.value)}
            />
            <select onChange={(e) => setType(e.target.value)} required>
              <option value="">{i18n.t('dashboard.select-type')}</option>
              <option value="shirt">{i18n.t("header.t-shirt")}</option>
              <option value="pants">{i18n.t("header.pants")}</option>
              <option value="trunks">{i18n.t("header.trunks")}</option>
            </select>
            <select onChange={(e) => setSeason(e.target.value)} required>
              <option value="allyear">{i18n.t('dashboard.select-season')}</option>
              <option value="allyear">{i18n.t("header.all-year")}</option>
              <option value="fall">{i18n.t("header.fall-winter")}</option>
              <option value="spring">{i18n.t("header.spring-summer")}</option>
            </select>
            <input
              type="number"
              required
              placeholder={i18n.t('dashboard.price')}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div>
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-xs')}
                onChange={(e) => setStockXS(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-s')}
                onChange={(e) => setStockS(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-m')}
                onChange={(e) => setStockM(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-l')}
                onChange={(e) => setStockL(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-xl')}
                onChange={(e) => setStockXL(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder={i18n.t('dashboard.stock-xxl')}
                onChange={(e) => setStockXXL(e.target.value)}
              />
            </div>
            <button onClick={(e) => createStockArray(e)}>{i18n.t('dashboard.load-stock')}</button>

            <button type="submit">{i18n.t('dashboard.submit')}</button>
          </StyledForm>
          <ImagePreview>
            {productImg ? (
              <>
                <img src={productImg} alt="product!" />
              </>
            ) : (
              <p>{i18n.t('dashboard.image-preview-will-appear-here')}</p>
            )}
          </ImagePreview>
        </StyledCreateProduct>
      </div>
    );
}

export default CreateComponent;

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