import NavBar from '../navBar/NavBar.jsx'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsCreate } from '../../redux/actions.js';
import styled from "styled-components";

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
            <h3>Create a Product</h3>
            <input
              id="imgUpload"
              accept="image/*"
              type="file"
              onChange={handleProductImageUpload}
              required
            />
            <select onChange={(e) => setColor(e.target.value)} required>
              <option value="">Select Color</option>
              <option value="red">Rojo</option>
              <option value="blue">Azul</option>
              <option value="white">Blanco</option>
              <option value="black">Negro</option>
              <option value="yellow">Amarillo</option>
              <option value="green">Verde</option>
            </select>
            <input
              type="text"
              required
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <select onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="shirt">Remera</option>
              <option value="pants">Pantalon</option>
            </select>
            <select onChange={(e) => setSeason(e.target.value)} required>
              <option value="allyear">Select Season</option>
              <option value="allyear">Todo el año</option>
              <option value="fall">Otoño/Invierno</option>
              <option value="spring">Primavera/Verano</option>
            </select>
            <input
              type="number"
              required
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <div>
              <input
                type="number"
                required
                placeholder="stock-xs"
                onChange={(e) => setStockXS(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="stock-s"
                onChange={(e) => setStockS(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="stock-m"
                onChange={(e) => setStockM(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="stock-l"
                onChange={(e) => setStockL(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="stock-xl"
                onChange={(e) => setStockXL(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="stock-xxl"
                onChange={(e) => setStockXXL(e.target.value)}
              />
            </div>
            <button onClick={(e) => createStockArray(e)}>CARGAR STOCK</button>

            <button type="submit">Submit</button>
          </StyledForm>
          <ImagePreview>
            {productImg ? (
              <>
                <img src={productImg} alt="product!" />
              </>
            ) : (
              <p>Image preview will appear here!</p>
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