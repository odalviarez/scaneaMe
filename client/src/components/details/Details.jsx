import React from 'react'
import './details.css'
export default function Details({name, type, stock, color, price, image}) {
  return (
    <div className='container'>
      <div className='img-container'>
        <img src={image} alt="" />
      </div>

      <div className='card'>
        <div className='name-sku-container'>
          <div className='name-container'> <h3>{name}</h3></div>
          <p>SKU: 41255514</p>
        </div>

        <div className='info-buttons'>

          <div className='left'>
        
            <select name="color" id="">
              <option value="blue">blue</option>
              <option value="red">red</option>
              <option value="green">green</option>
              <option value="black">black</option>
            </select>

            <h2>${price}</h2>
          
          </div>
          
          <div className='rigth'>
          <div className='button-container'>

            <div className='buy-button'>
              <button>Buy Now</button>
            </div>

            <div className='icon-button'>
              <button>Add Cart</button>
              <button>Favorite</button>
            </div>
            
            </div>
          </div>
          
        </div>
      </div>

      <div className='catalogue-link'>
        <a href="#"><h3>Back To catalogue</h3></a>
      </div>

      
    </div>
  )
}