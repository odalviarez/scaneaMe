import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const LOAD_ALL_PRODUCTS = 'LOAD_ALL_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const CLEAN_PRODUCT_DETAIL = 'CLEAN_PRODUCT_DETAIL';


export const getAllProducts = () => { 
    return async function (dispatch) {
        try {
            const json = await axios.get("/products")
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: json.data,
            })
        } catch (error) {
            alert ('Could not get products')
            console.log(error)
        }
    }
};

export const loadAllProducts = (payload) => { 
    return { type: LOAD_ALL_PRODUCTS, payload: payload }
};

export const sortProducts = (payload) => { 
    return { type: SORT_PRODUCTS, payload: payload }
};

export const filterProducts = (payload) => { 
    return { type: FILTER_PRODUCTS, payload: payload }
};


export const productsCreate = (payload) => { 
    return async function () { 
    try {
        const res = await axios.post('/', payload);
        return res;
    } catch (error) {
        alert('No se pudo crear el producto')
        console.log(error)}  
    }
}



// export const getRecipeDetail = (id) => { 
//     return async function(dispatch) {
//         try {
//             await fetch(`http://localhost:3001/recipes/${id}`)
//             .then(res => res.json())
//             .then(data => dispatch({ type: GET_RECIPE_DETAIL, payload: data }))
//         } catch (error) {
//             alert('No se pudieron encontrar recetas con ese ID')
//             console.log(error)
//         }  
//     }
// }




// export const cleanRecipeDetail = (payload) => { 
//     return { type: 'CLEAN_RECIPE', payload: payload }
// };



