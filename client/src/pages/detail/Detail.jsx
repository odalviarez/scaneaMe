import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {getProductDetails} from '../../redux/actions'
import Details from '../../components/details/Details.jsx'

export default function Detail() {
  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { id } = useParams();
    
  useEffect(() => {
    dispatch(getProductDetails(id))
    }, [dispatch])

  const {name, type, stock, color, price, image} = productDetail;

  return (
    <div>
      <Details name={name} type={type} stock={stock} color={color} price={price} image={image} id ={id}/>
    </div>
  )
}
