import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {handleCheckout} from "../../redux/actions"

//import { url } from "../slices/api";
axios.defaults.baseURL = "http://localhost:5000"; //ver esto, variable de desarrollo
const PayButton = ( cartProp ) => {
  const { user } = useAuth0(); //, isAuthenticated

  return (
    <>
      <button onClick={() => handleCheckout(cartProp, user)}>Check Out</button>
    </>
  );
};

export default PayButton;