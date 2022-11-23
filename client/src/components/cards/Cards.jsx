import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import products from '../../productos'
import Card from '../card/Card'

export default function Cards() {

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
    
      <div>
        {products? products.map(p => {
          return <Card
          key={p.id}
          id={p.id}
          name={p.name}
          img={p.image}/>
        }) : 'No product was found'}
      </div>
    
    
    
    </div>

  )
}
