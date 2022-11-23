import { GET_ALL_PRODUCTS, LOAD_ALL_PRODUCTS } from "./actions";


const initialState = {
    products: [],
    allProducts: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS:
            return {
            ...state,
            products: action.payload,
            allProducts: action.payload
        }


        case LOAD_ALL_PRODUCTS:
            let allproduct = state.allProducts
            return {
            ...state,
            products: allproduct,
        }


        default:
            return { 
            ...state 
        } 
    }
};


export default rootReducer;