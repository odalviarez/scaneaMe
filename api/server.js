const express = require("express");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv').config();
const routes = require("./routes/index.js");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { auth } = require("express-oauth2-jwt-bearer");


auth({
  audience: "https://scaneame.vercel.app/",
  issuerBaseURL: `https://dev-a3kheszuwvfvuoad.us.auth0.com/`,
});

const server = express();


//server.use(express.json({ limit: "50mb", extended: true }));
//server.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

server.name = "API";
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Luego poner que las peticiones solo las acepte desde el dominio de vercel
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);


//Se realizan las conexiones

connectDB();

server.listen(port, () => console.log(`Server started on port ${port} ✔✔✔`));

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;