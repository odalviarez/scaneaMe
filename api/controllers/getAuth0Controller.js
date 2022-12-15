const express = require("express");
const axios = require("axios");




const getAuth0Controller = async (userID, action, data) => {
  const request = {
    method: "POST",
    url: "https://dev-a3kheszuwvfvuoad.us.auth0.com/oauth/token",
    headers: { 'content-type': 'application/json' },
    data: '{"client_id":"F460G9sIAQx5ZtHzzPgpAC0Nm509ClZ1","client_secret":"F8P-mIhXRggsNIEu4Qcra3RJHtveeBnNdSDRWOhEyjQO47WrxHZ7cmMx62HspplE","audience":"https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };
  console.log('getAuth0Controller en el Back', userID, action, data);
  let auth0Response = ''

  await axios(request)
  .then(async function (response) {
    const token = response.data.access_token;

    let config = ""
    
    switch (action) {
      case 'delete':
        config = {
          method: "PATCH", 
          url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users/${userID}`,
          headers: {
            authorization: `Bearer ${token}`
          },
          data: { "blocked": true }
        }

      break;

      case 'get':
        config = {
          method: "GET",
          url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users`,
          headers: {
            authorization: `Bearer ${token}`
          },
        }

      break;

      case 'passwordChange':
        config = {
          method: "PATCH", 
          url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users/${userID}`, 
          headers: {
            authorization: `Bearer ${token}`
          },
          data: { "password": data }
        }

        break;

        case 'emailChange':
          config = {
            method: "PATCH", 
            url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users/${userID}`,
            headers: {
              authorization: `Bearer ${token}`
            },
            data: { "email": data, "email_verified": false, "verify_email": true, }
          }

          break;

          case 'makeAdmin':
            config = {
              method: "POST", 
              url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users/${userID}/roles`, 
              headers: {
                authorization: `Bearer ${token}`
              },
              data: { "roles": ["rol_2luoUkZRWwbEa3HT"] }
            }
  
          break;

          case 'removeAdmin':
            config = {
              method: "DELETE",
              url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/users/${userID}/roles`, 
              headers: {
                authorization: `Bearer ${token}`
              },
              data: { "roles": ["rol_2luoUkZRWwbEa3HT"] }
            }
  
          break;

      default:
        console.log('No se ejecutó nada de Auth0');
    }
    console.log('getAuth0Controller despues del switch', config);
    await axios(config)
    .then((response) => {
      auth0Response = response.data;
    })
    .catch((error) => {
      console.log('Falló el auth0Controller', error);
    });
    
  })
  .catch(function (error) {
    console.log(error);
  });

  return auth0Response

};

/**
* {
"access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpETXhncWpoUWpIRDY4SVJ0WUo4bCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hM2toZXN6dXd2ZnZ1b2FkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGNDYwRzlzSUFReDVadEh6elBncEFDME5tNTA5Q2xaMUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtYTNraGVzenV3dmZ2dW9hZC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MDQ2NzgzNywiZXhwIjoxNjcwNTU0MjM3LCJhenAiOiJGNDYwRzlzSUFReDVadEh6elBncEFDME5tNTA5Q2xaMSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.GgAM74c26CSBAt2_Xx0SoE99V4Ra7Le4F8RGAMOYhGkl-treC9gcUNr3-1IMycj6Tf_qyJbRJ1m2ZgQ9i183OAoY0BE-Y3KdcA_BX8jA-n9A4Cv7FZnrHfuATt6MLbLrBoB2QxiVhhRVeqvqXDvAmK9GjFEJpiRB1QDlxtbl8t5HPiEeaWMSINz0PZVphppvoDGj-HSVsLu4mSbqUpGUEfx7_pi75-EvpVS5okrxi9Kq0dH6rHC-tCqIPgdFMSAPvCwfW1r1NjI7KU6Erp7wyP86TSMhOilKk5RUHPAmVuBT7NGE6rw5i4A5rDK7kPok5_iXSQgP2NC_354WGx-ZTg",
"token_type": "Bearer"
}
*/



module.exports = getAuth0Controller;