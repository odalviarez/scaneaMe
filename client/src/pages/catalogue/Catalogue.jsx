import NavBar from '../../components/navBar/NavBar.jsx'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Cards from '../../components/cards/Cards'

export default function Catalogue() {


  // const dispatch = useDispatch();

  // const [state, setstate] = useState(initialState);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);















  return (
    <div>
      <NavBar />
      <h1>Catalogue</h1>
      <Cards/>
    </div>
  )
}
