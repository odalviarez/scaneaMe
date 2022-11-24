import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import products from '../../productos'
import NavBar from '../../components/navBar/NavBar.jsx'
import Details from '../../components/details/Details.jsx'

export default function Detail() {
  const dispatch = useDispatch();
    const productDetail = useSelector(state => state.productDetail);
    const { id } = useParams();
    console.log(id)
  return (
    <div>
      <NavBar />
      <Details/>
    </div>
  )
}
