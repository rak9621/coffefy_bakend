const app = require("./app");
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config({ path: "backend/.env" });
const conn = require("./db/conn");

// Handling Uncaught Exception
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors())


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
