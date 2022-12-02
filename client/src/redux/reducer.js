import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  LOAD_ALL_PRODUCTS,
  SORT_PRODUCTS,
  GET_PRODUCT_DETAILS,
  GET_USER,
  GET_TOTAL_PRODUCTS,
  GET_USER_LOGIN,
} from "./actions";

const initialState = {
    products: [],
    allProducts: [],
    productDetail:{},
    userDB: {},
    userLogin: {},
    totalProducts: 0,
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
        console.log("se despacho accion");
        let productsFiltered = [];

        for (let i = 0; i < action.payload.length; i++) {
          let filter = action.payload[i];
          for (let i = 0; i < state.allProducts.length; i++) {
            const product = state.allProducts[i];
            if (filter.filter === "type") {
              if (product.type === filter.value) {
                if (productsFiltered.includes(product) === false) {
                  productsFiltered.push(product);
                }
              }
            }
            if (filter.filter === "color") {
              if (product.color === filter.value) {
                if (productsFiltered.includes(product) === false) {
                  productsFiltered.push(product);
                }
              }
            }
            if (filter.filter === "season") {
              if (product.season === filter.value) {
                if (productsFiltered.includes(product) === false) {
                  productsFiltered.push(product);
                }
              }
            }
          }
        }
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

      default:
        return {
          ...state,
        };
    }
};


export default rootReducer;