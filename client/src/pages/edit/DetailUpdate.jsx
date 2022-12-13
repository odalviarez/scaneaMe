import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {getProductDetails} from '../../redux/actions'
import NavBar from '../../components/navBar/NavBar.jsx'
import Details from '../../components/cardsDashboard/DetailsUpdate.jsx'

export default function Detail() {
  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { id } = useParams();
    
  useEffect(() => {
    dispatch(getProductDetails(id))
    }, [dispatch])

  const {name, type, color, price} = productDetail;

  return (
    <div>
      <NavBar />
      <Details name={name} type={type} color={color} price={price} id={id}/>
    </div>
  )
}
