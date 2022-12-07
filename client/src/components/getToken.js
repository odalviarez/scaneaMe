import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const { getAccessTokenSilently } = useAuth0();

const getToken = async () => {
  const token = await getAccessTokenSilently();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default getToken;