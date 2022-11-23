import React from 'react'
import './details.css'
export default function Details({name,id, cost, size, img}) {
  return (
    <div className='container'>
      <div className='img-container'>
        <img src="https://assets.adidas.com/images/w_600,f_auto,q_auto/7b85bada2e2d4329bdd4aa3100c072a6_9366/Zapatillas_Energyfalcon_Negro_EE9843_01_standard.jpg" alt="" />
      </div>

      <div className='card'>
        <div className='name-sku-container'>
          <div className='name-container'> <h3>Product Name</h3></div>
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

            <h2>$100</h2>
          
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