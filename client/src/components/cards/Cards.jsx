import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import products from '../../productos'
import Card from '../card/Card'
import { useLocalStorage } from '../../useLocalStorage'
import { filterProducts, getAllProducts, loadAllProducts, sortProducts } from '../../redux/actions'
import styles from './Cards.module.css'
export default function Cards() {

  const dispatch = useDispatch();

  const [cart, setCart] = useLocalStorage('cartProducts', {
    cartProducts: []
  });

  const [sort, setSort] = useState('');

  const [filters, setFilters] = useState({
    filtersApplied: []
  });

  const productsLoaded = useSelector((state) => state.products)
  const productsOnStore = useSelector((state) => state.allProducts)
  
  useEffect( () => {
    if(productsOnStore.length === 0){
    dispatch(getAllProducts())}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  

  const handleAddCart = function (e) {
    e.preventDefault(e);
    console.log(e.target.value);
    const newProduct = products.find(p => p.id === Number(e.target.value))
    console.log('este es newProduct', newProduct);
    setCart({
      cartProducts: [...cart.cartProducts, newProduct]
    })
  }

  const handleSorts = function (e) {
    e.preventDefault(e);
    dispatch(sortProducts(e.target.value))
    setSort(e.target.value)
  }


  const handleFilters = function (e) {
    e.preventDefault(e);
    let filtersUsed = [ ...filters.filtersApplied, {
      filter : e.target.parentNode.attributes.value.value,
      value : e.target.attributes.value.value,
      valor: e.target.innerHTML
    } ]
    let filterUsed = {
      filter : e.target.parentNode.attributes.value.value,
      value : e.target.attributes.value.value,
      valor: e.target.innerHTML
    }
    if (filters.filtersApplied.length > 0) {
        if (filters.filtersApplied.find(f => f.value === (filterUsed.value)) === undefined) {
          setFilters((filters) => ({
            filtersApplied: [...filters.filtersApplied, filterUsed]
          }))
          dispatch(filterProducts(filtersUsed))
        }
    } else {
      setFilters((filters) => ({
        filtersApplied: [filterUsed]}))
        dispatch(filterProducts([filterUsed]))
    }
  }
  
  

  const removeFilter = function (e) {
    e.preventDefault();
    let newFilters = filters.filtersApplied.filter(filter => filter.value !== e.target.attributes.value.value)
    console.log(newFilters);
    setFilters((filters) => ({
      filtersApplied: newFilters}))
      if (newFilters.length === 0) {
        dispatch(loadAllProducts())
      } else {
        dispatch(filterProducts(newFilters))
      }
  }




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

      <div className={styles.filtersApplied}>{filters.filtersApplied?.map((f, index) => 
      <p key={index} className={styles.filter} onClick={removeFilter} value={f.value}>X {f.valor}</p>
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
          <li value='green' onClick={(e) => handleFilters(e)}>Verde</li>
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
