import axios from "axios";
import { useSelector } from "react-redux";
//import { url } from "../slices/api";
axios.defaults.baseURL = "http://localhost:5000"; //ver esto porque no debe llamarse a se misma para ahcer una peticion
const PayButton = ( cartProp ) => {
    console.log(cartProp);
    const user = useSelector((state) => state.auth);
    console.log(user);
    const handleCheckout = () => {
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