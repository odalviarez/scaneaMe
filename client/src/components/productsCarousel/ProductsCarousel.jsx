import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductsCarousel.module.css'
import { getAllProducts } from '../../redux/actions'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import HomeCard from './HomeCard'




export default function HomeBanners({ productType }) {
  const dispatch = useDispatch();


  const allProducts = useSelector(state => state.allProducts)
  const product = allProducts.map(e => ({
    image: e.image,
    price: e.price,
    id: e.id,
    type: e.type,
  }))

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 689 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 689, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }


  const productFiltered = product.filter(e => e.type === productType)

  const productCard = productFiltered.map(item => (
    <HomeCard image={item.image} price={item.price} id={item.id} />
  ))


  return (
    <div className={styles.container}>
      <Carousel
        className={styles.carru}
        responsive={responsive}
        showDots={true}
        infinite={true}
        renderDotsOutside={true}
      >
        {productCard}
      </Carousel>
    </div>
  )
}
