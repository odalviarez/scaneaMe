import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

//import { url } from "../slices/api";
axios.defaults.baseURL = "http://localhost:5000"; //ver esto, variable de desarrollo
const PayButton = ( cartProp ) => {
  const { user } = useAuth0(); //, isAuthenticated

  const handleCheckout = () => {
    console.log(cartProp.cartItems);
    axios
      .post(`/stripe/create-checkout-session`, {
        cartItems: cartProp.cartItems,
        userId: user.id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
};

export default PayButton;