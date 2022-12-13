import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const LOAD_ALL_PRODUCTS = "LOAD_ALL_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const GET_USER = "GET_USER";
export const GET_TOTAL_PRODUCTS = "GET_TOTAL_PRODUCTS";
export const GET_USER_LOGIN = "GET_USER_LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const USER_GET_ORDERS = "USER_GET_ORDERS";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      alert("Could not get products");
      console.log(error);
    }
  };
};

export const loadAllProducts = (payload) => {
  return { type: LOAD_ALL_PRODUCTS, payload: payload };
};

export const sortProducts = (payload) => {
  return { type: SORT_PRODUCTS, payload: payload };
};

export const filterProducts = (payload) => {
  return { type: FILTER_PRODUCTS, payload: payload };
};

export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios(`/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const productsCreate = (payload, getToken) => {
  return async function () {
    const token = await getToken();
    try {
      let config = {
        method: "post",
        url: process.env.REACT_APP_API
          ? process.env.REACT_APP_API + "products/"
          : "http://localhost:5000/products/",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      };

      axios(config)
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .catch(function (error) {
          return error;
        });
    } catch (error) {
      alert("No se pudo crear el producto");
    }
  };
};

export const getTotalProducts = (products) => {
  return {
    type: GET_TOTAL_PRODUCTS,
    payload: products,
  };
};

export const updateProduct = (id, data) => {
  return async function () {
    try {
      const res = await axios.put(`/products/${id}`, data);
      return res;
    } catch (error) {
      alert("No se pudo actualizar el producto");
    }
  };
};

export const productDelete = (id, getToken) => {
  return async function () {
    const token = await getToken();
    try {
      let config = {
        method: "delete",
        url: process.env.REACT_APP_API
          ? process.env.REACT_APP_API + `products/${id}`
          : `http://localhost:5000/products/${id}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          return JSON.stringify(response.data);
        })
        .catch(function (error) {
          return error;
        });
    } catch (error) {
      alert("No se pudo eliminar el producto");
    }
  };
};

export const getUser = (email) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/user/${email}`);
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    } catch (error) {
      alert("Could not get user profile", error.message);
    }
  };
};

export const getUserLogin = (user, cart, getToken) => {
  return async function (dispatch) {
    let data = { ...user, cart };
    let token = "";
    let config = "";
    try {
      if (getToken) {
        token = await getToken();
        config = {
          method: "post",
          url: process.env.REACT_APP_API
            ? process.env.REACT_APP_API + `user/login/${user.email}`
            : `http://localhost:5000/user/login/${user.email}`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data,
        };
      } else {
        config = {
          method: "post",
          url: process.env.REACT_APP_API
            ? process.env.REACT_APP_API + `user/login/${user.email}`
            : `http://localhost:5000/user/login/${user.email}`,
          data,
        };
      }

      axios(config)
        .then(function (response) {
          return dispatch({
            type: GET_USER_LOGIN,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });
    } catch (error) {
      console.log(error);
      alert("Could not get user login", error.message);
    }
  };
};

export const userUpdate = (payload, user, getToken) => {
  return async function () {
    try {
      const token = await getToken();
      let config = {
        method: "put",
        url: process.env.REACT_APP_API
          ? process.env.REACT_APP_API + `/user/${user}`
          : `http://localhost:5000/user/${user}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      };
      axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
    } catch (error) {
      console.log(error);
      alert("No se pudo actualizar los datos del usuario");
    }
  };
};

export const userUpdateAuth0 = (payload, sub, action, getToken) => {
  return async function () {
    try {
      const token = await getToken();
      let config = {
        method: "put",
        url: process.env.REACT_APP_API
          ? process.env.REACT_APP_API + `user/${sub}/${action}`
          : `http://localhost:5000/user/${sub}/${action}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { payload },
      };
      axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
    } catch (error) {
      console.log(error);
      alert("No se pudo actualizar los datos del usuario en Auth0");
    }
  };
};

export const userGetOrders = (email, getToken) => {
  return async function (dispatch) {
    const token = await getToken();
    try {
      let config = {
        method: "get",
        url: process.env.REACT_APP_API
          ? process.env.REACT_APP_API + `order/find/${email}`
          : `http://localhost:5000/order/find/${email}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then(function (json) {
          return dispatch({
            type: USER_GET_ORDERS,
            payload: json.data,
          });
        })
        .catch(function (error) {
          return error;
        });
    } catch (error) {
      console.log("Could not get orders from user", error);
    }
  };
};

export const handleCheckout = (cartProp, user) => {
  console.log("User: ", user);
  axios
    .post(`/stripe/create-checkout-session`, {
      cartItems: cartProp.cartItems,
      userEmail: user.email,
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err.message));
};
