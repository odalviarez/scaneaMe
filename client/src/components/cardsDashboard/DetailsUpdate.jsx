import React, { useState } from "react";
import './detailsUpdate.css'
import { useNavigate } from "react-router-dom";
import i18n from '../../i18n'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../redux/actions.js';

export default function DetailsUpdate({id, name, color, price, stock, type, season}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    id,
    name,
    color,
    type,
    price,

  });

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file)
}

function handleSubmit(e) {
  e.preventDefault();
  //  setActivo(!activo);
  //  setInactivo(!inactivo)
    dispatch(
      updateProduct(id, values, {
        name: values.name,
        color: values.color,
        type: values.type,
        price: values.price,
      })
      );
}

const TransformFile = (file)  => {
  const reader = new FileReader();

  if(file) {
  reader.readAsDataURL(file);
  
  } 
};

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    console.log(values)
   
    const { target } = e;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }
 
  return (
    
    <form onSubmit={handleSubmit}>
        <div
          className=" flex flex-col  p-8 rounded-3xl
         flex-wrap  border-4 text-slate-600 bg-slate-200"
        >          
          <div>
            <span>ID: </span>
            <input
              id="id"
              name="id"
              type={"id"}
              value={id}
              onChange={handleChange}
            ></input>
          </div><br/>

          <div >
            <label >Name: </label>
            <input
              id="name"
              name="name"
              type={"text"}
              value={values.name}
              onChange={handleChange}              
              required
            ></input>
          </div><br/>

          <div>
            <label >Color: </label>
            <select id="color"
              name="color"
              type={"text"}
              value={values.color}
              onChange={handleChange}
               required>
              <option value="">{i18n.t("dashboard.select-color")}</option>
              <option value="red">{i18n.t("header.red")}</option>
              <option value="blue">{i18n.t("header.blue")}</option>
              <option value="white">{i18n.t("header.white")}</option>
              <option value="black">{i18n.t("header.black")}</option>
              <option value="yellow">{i18n.t("header.yellow")}</option>
              <option value="green">{i18n.t("header.green")}</option>
              <option value="gray">{i18n.t("Gray")}</option>
            </select>
          </div><br/>

          <div>
          <label>Type: </label>
          <select id="type"
              name="type"
              type={"text"}
              value={values.type}
              onChange={handleChange}
              required>
              <option value="">{i18n.t('dashboard.select-type')}</option>
              <option value="shirt">{i18n.t("header.t-shirt")}</option>
              <option value="pants">{i18n.t("header.pants")}</option>
              <option value="trunks">{i18n.t("header.trunks")}</option>
            </select>
            </div><br/>

          <div >
            <label >Price$: </label>
            <input
              id="price"
              name="price"
              type={"number"}
              value={values.price}
              onChange={handleChange}
              required
            ></input>
          </div>
          
          <div>
              <button onClick={() => (true)}>{" "}Edit</button>
          </div>
        </div>
</form>
  )}
