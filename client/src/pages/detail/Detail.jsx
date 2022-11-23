import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import NavBar from '../../components/navBar/NavBar'
import Details from '../../components/details/Details'
export default function Detail() {
  const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    // const { id } = useParams();
    
  return (
    <div>
      <NavBar/>
      <Details  />
    </div>
  )
}
