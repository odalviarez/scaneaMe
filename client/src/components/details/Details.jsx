import React from 'react'
import './details.css'
export default function Details({name, type, stock, color, price, image}) {
  return (
    <main class="item">
      <section class="img">
        <img src={image} alt={name} class="img-main" />
      </section>

      <section class="price">
        <h1 class="price-main__heading">{name}</h1>

        <div class="price-box">

          <div class="price-box__main">
            <span class="price-box__main-new">${price}</span>
          </div>

          <div>
            <select className='select-btn' name="" id="">
              <option value="">color</option>
              <option value="red">red</option>
              <option value="grey">grey</option>
              <option value="black">black</option>
            </select>
          </div>
        </div>

        <div class="price-btnbox">
          
          <button class="price-cart__btn btn--orange">
            <img
              height={'30px'}
              src="https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/shopping-cart-grey-512.png"
              alt="cart image"
              class="price-cart__btn-img"
            />
            Add to cart
          </button>
          <button class="price-cart__btn btn--orange">
            Buy Now
          </button>
          <button class="price-cart__btn btn--orange">
            <img
              height={'30px'}
              src='http://www.clker.com/cliparts/K/s/1/Z/m/p/grey-heart-md.png'
              alt=""
              class="price-cart__btn-img"
            />
            Add Favorite
          </button>
        </div>
      </section>

    </main>
  )
}