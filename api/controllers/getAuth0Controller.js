const express = require("express");
const axios = require("axios");
const request = require("request");



const getAuth0Controller = (userID) => {
  var options = {
    method: "POST",
    url: "https://dev-a3kheszuwvfvuoad.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"F460G9sIAQx5ZtHzzPgpAC0Nm509ClZ1","client_secret":"F8P-mIhXRggsNIEu4Qcra3RJHtveeBnNdSDRWOhEyjQO47WrxHZ7cmMx62HspplE","audience":"https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const token = body.access_token;

  const options = {
    method: "GET",//Hacer condicional para que pueda ser GET, UPDATE, DELETE
    url: `https://dev-a3kheszuwvfvuoad.us.auth0.com/api/v2/user/${userID}`,//hacer condicional para las distintas rutas
    headers: { authorization: `Bearer ${token}` },
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  });
}
  /**
 * {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpETXhncWpoUWpIRDY4SVJ0WUo4bCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hM2toZXN6dXd2ZnZ1b2FkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGNDYwRzlzSUFReDVadEh6elBncEFDME5tNTA5Q2xaMUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtYTNraGVzenV3dmZ2dW9hZC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MDQ2NzgzNywiZXhwIjoxNjcwNTU0MjM3LCJhenAiOiJGNDYwRzlzSUFReDVadEh6elBncEFDME5tNTA5Q2xaMSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.GgAM74c26CSBAt2_Xx0SoE99V4Ra7Le4F8RGAMOYhGkl-treC9gcUNr3-1IMycj6Tf_qyJbRJ1m2ZgQ9i183OAoY0BE-Y3KdcA_BX8jA-n9A4Cv7FZnrHfuATt6MLbLrBoB2QxiVhhRVeqvqXDvAmK9GjFEJpiRB1QDlxtbl8t5HPiEeaWMSINz0PZVphppvoDGj-HSVsLu4mSbqUpGUEfx7_pi75-EvpVS5okrxi9Kq0dH6rHC-tCqIPgdFMSAPvCwfW1r1NjI7KU6Erp7wyP86TSMhOilKk5RUHPAmVuBT7NGE6rw5i4A5rDK7kPok5_iXSQgP2NC_354WGx-ZTg",
  "token_type": "Bearer"
}
 */



module.exports = getAuth0Controller;