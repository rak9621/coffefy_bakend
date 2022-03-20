const app = require("./app");
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config({ path: "backend/.env" });
const conn = require("./db/conn");

app.use(cors())

app.get('/product', function (req, res, next) {
  res.send("cors enable ")
})

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
