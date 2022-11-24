import React from 'react'
import Cards from '../../components/cards/Cards'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import style from './Catalogue.module.css'

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
    <div >
      <NavBar/>
      <div className={style.body}><Cards /></div>
      <Footer/>
    </div>
  )
}
