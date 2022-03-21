const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/.env" });
const conn = require("./db/conn");
const moesif = require('moesif-nodejs');

const moesifMiddleware = moesif({
  applicationId: 'eyJhcHAiOiIxMDkxOjE4MiIsInZlciI6IjIuMCIsIm9yZyI6IjI2Mjo3NDIiLCJpYXQiOjE2NDYwOTI4MDB9.-PXutJTH5eKOWGHbuFt5mKOXDeVj2DiwQoBYf236z84',


  identifyUser: function (req, res) {
    return req.user ? req.user.id : undefined;
  },
});


app.use(moesifMiddleware);


process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down server due to uncaughtException");

  process.exit(1);
});

//CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const server = app.listen(process.env.PORT, () => {
  console.log(`server ${process.env.PORT} started`);
});

//unhandle rejection  and shutdown server

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down server due to unhandle rejection");

  server.close(() => {
    process.exit(1);
  });
});
