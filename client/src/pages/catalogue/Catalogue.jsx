import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Cards from '../../components/cards/Cards'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'

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
      <NavBar/>
      <Cards/>
      <Footer/>
    </div>
  )
}
