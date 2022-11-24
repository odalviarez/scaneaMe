import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// products from '../../productos'
import Card from '../card/Card'
import { useLocalStorage } from '../../useLocalStorage'
import { filterProducts, getAllProducts, loadAllProducts, sortProducts } from '../../redux/actions'
import styles from './Cards.module.css'
export default function Cards() {

  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage("cartProducts", {
    cartProducts: [],
  });


  const [sort, setSort] = useState('');

  const [filter, setFilter] = useState({
    filtersApplied: []
  });

  const productsLoaded = useSelector((state) => state.products)
  const products = useSelector((state) => state.products);

  const handleAddCart = function (e) {
    e.preventDefault(e);
    const newProduct = products.find(p => p.id === e.target.value)
    console.log('este es newProduct', newProduct);
    setCart({
      cartProducts: [
        ...cart.cartProducts,
        { ...newProduct, cartTotalQuantity: 1, cartTotalAmount: 0 },
      ],
    });
  }

  const handleSorts = function (e) {
    e.preventDefault();
    dispatch(sortProducts(e.target.value))
    setSort(e.target.value)
  }


  const handleFilters = function (e) {
    e.preventDefault();
    let payload = {
      filter : e.target.parentNode.attributes.value.value,
      value : e.target.attributes.value.value
    }
    if (filter.filtersApplied.includes(payload.value) === false){
      dispatch(filterProducts(payload))
      setFilter({
        filtersApplied: [...filter.filtersApplied, e.target.attributes.value.value]
      })
    }
  }

  const removeFilter = function (e) {
    e.preventDefault();
    
  }


  useEffect(() => {
    dispatch(getAllProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (productsLoaded.length === 0) {
  //   dispatch(loadAllProducts())}
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productsLoaded]);






  return (
    <div>


      <div> Ordenar por
          <select onChange={(e) => handleSorts(e)}>
            <option value='priceUp'>Menor precio</option>
            <option value='priceDown'>Mayor precio</option>
          </select>
      </div>

      <div className={styles.filtersApplied}>{filter.filtersApplied?.map((f, index) => 
      <p key={index} className={styles.filter} value={f}>{f}</p>
      )}
      </div>

        <ul> Temporada
          <li>Verano / Primavera</li>
          <li>Invierno / Otoño</li>
        </ul>

        <ul value='type' > Tipo de ropa
          <li value='shirt' onClick={(e) => handleFilters(e)}>Remera</li>
          <li value='pants' onClick={(e) => handleFilters(e)}>Pantalon</li>
        </ul>

        <ul value='color'> Color
          <li value='white' onClick={(e) => handleFilters(e)}>Blanco</li>
          <li value='black' onClick={(e) => handleFilters(e)}>Negro</li>
          <li value='red' onClick={(e) => handleFilters(e)}>Rojo</li>
          <li value='blue' onClick={(e) => handleFilters(e)}>Azul</li>
        </ul>
  
    
      <div className={styles.cards}>
        {productsLoaded.length? productsLoaded.map(p => {
          return <Card 
          key={p.id}
          id={p.id}
          name={p.name}
          img={p.image}
          price={p.price}
          type={p.type}
          color={p.color}
          handleAddCart = {handleAddCart}
          />
        }) : 'No product was found'}
      </div>
    
    
    
    </div>

  )
}
