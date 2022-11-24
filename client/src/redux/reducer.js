import { FILTER_PRODUCTS, GET_ALL_PRODUCTS, LOAD_ALL_PRODUCTS, SORT_PRODUCTS } from "./actions";


const initialState = {
    products: [],
    allProducts: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS:
            console.log('Se hizo un GET a la base de datos');
            return {
            ...state,
            products: action.payload,
            allProducts: action.payload
        }


        case LOAD_ALL_PRODUCTS:
            let allproduct = state.allProducts
            return {
            ...state,
            products: allproduct
        }

        case SORT_PRODUCTS:
            const sortedProducts = state.products
            if (action.payload === 'priceUp') {
                sortedProducts.sort((a, b) => a.price - b.price )
            }
            if (action.payload === 'priceDown') {
                sortedProducts.sort((a, b) => b.price - a.price )
            }
            return {
            ...state,
            products: sortedProducts
        }

        case FILTER_PRODUCTS:

            let productsFiltered = []

            console.log(action.payload);
            
            for (let i = 0; i < action.payload.length; i++) {
                let filter = action.payload[i]
                for (let i = 0; i < state.allProducts.length; i++) {
                    const product = state.allProducts[i];   
                    if (filter.filter === 'type'){
                        if (product.type === filter.value){
                            if (productsFiltered.includes(product) === false){
                            productsFiltered.push(product)}
                        }
                    }
                    if (filter.filter === 'color'){
                        if (product.color === filter.value){
                            if (productsFiltered.includes(product) === false){
                            productsFiltered.push(product)}
                        }
                    }
                }
            }
            return {
            ...state,
            products: productsFiltered
        }

        default:
            return { 
            ...state 
        } 
    }
};


export default rootReducer;