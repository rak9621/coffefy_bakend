const app = require("./app");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config({ path: "backend/.env" });
const conn = require("./db/conn");

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
