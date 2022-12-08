import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  LOAD_ALL_PRODUCTS,
  SORT_PRODUCTS,
  GET_PRODUCT_DETAILS,
  GET_USER,
  GET_TOTAL_PRODUCTS,
  GET_USER_LOGIN,
  USER_GET_ORDERS
} from "./actions";

const initialState = {
    products: [],
    allProducts: [],
    productDetail:{},
    userDB: {},
    userLogin: {},
    totalProducts: 0,
    userOrders: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          allProducts: action.payload,
        };
      case LOAD_ALL_PRODUCTS:
        let allproduct = state.allProducts;
        return {
          ...state,
          products: allproduct,
        };
      case SORT_PRODUCTS:
        const sortedProducts = state.products;
        if (action.payload === "priceUp") {
          sortedProducts.sort((a, b) => a.price - b.price);
        }
        if (action.payload === "priceDown") {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        return {
          ...state,
          products: sortedProducts,
        };

      case FILTER_PRODUCTS:
        console.log(action.payload);
        let productsFiltered = []


        if (Object.hasOwn((action.payload), 'season')) {
          if (Object.hasOwn((action.payload.season), 'value')){
          productsFiltered = state.products.filter(product => product.season === action.payload.season.value)
        }}

        if (Object.hasOwn((action.payload), 'type')) {
          if (Object.hasOwn((action.payload.type), 'value')){
          productsFiltered = state.products.filter(product => product.type === action.payload.type.value)
        }}

        if (Object.hasOwn((action.payload), 'color')) {
          if (Object.hasOwn((action.payload.color), 'value')){
          productsFiltered = state.products.filter(product => product.color === action.payload.color.value)
        }}
        
        return {
          ...state,
          products: productsFiltered,
        };

      case GET_PRODUCT_DETAILS: {
        return {
          ...state,
          productDetail: action.payload,
        };
      }

      case GET_USER: {
        return {
          ...state,
          userDB: action.payload,
        };
      }

      case GET_USER_LOGIN: {
        return {
          ...state,
          userLogin: action.payload,
        };
      }
      case GET_TOTAL_PRODUCTS: {
        return {
          ...state,
          totalProducts: action.payload,
        };
      }

      case USER_GET_ORDERS: {
        return {
          ...state,
          userOrders: action.payload,
        };
      }

      default:
        return {
          ...state,
        };
    }
};


export default rootReducer;