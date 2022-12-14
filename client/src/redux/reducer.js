import {
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  LOAD_ALL_PRODUCTS,
  SORT_PRODUCTS,
  GET_PRODUCT_DETAILS,
  GET_USER,
  GET_TOTAL_PRODUCTS,
  GET_USER_LOGIN,
  USER_GET_ORDERS,
  ADMIN_GET_USERS,
  ADMIN_LOAD_USERS,
  ADMIN_GET_ORDERS,
  ADMIN_LOAD_ORDERS
} from "./actions";

const initialState = {
    products: [],
    allProducts: [],
    productDetail:{},
    userDB: {},
    userLogin: {},
    totalProducts: 0,
    userOrders: [],
    allUsers: [],
    usersLoaded: [],
    orders: [],
    allOrders: []
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
        let productsFiltered = state.allProducts
        
        for (let i=0; i < action.payload.length; i++) {
          let filter = action.payload[i]
          
            switch (filter.filter){
              case 'season':
                productsFiltered = productsFiltered.filter((product) => product.season === filter.value)

              break;

              case 'type':
                productsFiltered = productsFiltered.filter((product) => product.type === filter.value)

              break;

              case 'color':
                productsFiltered = productsFiltered.filter((product) => product.color === filter.value)

              break;

              default:
                console.log('No se filtró nada');
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

      case USER_GET_ORDERS: {
        return {
          ...state,
          userOrders: action.payload,
        };
      }

      case ADMIN_GET_USERS: {
        return {
          ...state,
          allUsers: action.payload,
          usersLoaded: action.payload,
        };
      }

      case ADMIN_LOAD_USERS:
        let allUsers = state.allUsers;
        return {
          ...state,
          usersLoaded: allUsers,
        };

        case ADMIN_GET_ORDERS: {
          return {
            ...state,
            allOrders: action.payload,
            orders: action.payload,
          };
        }
  
        case ADMIN_LOAD_ORDERS:
          let allOrders = state.allUsers;
          return {
            ...state,
            usersLoaded: allOrders,
          };

      default:
        return {
          ...state,
        };
    }
};


export default rootReducer;