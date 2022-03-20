const cors = require('cors')
const express = require("express");
const cookiesParser = require("cookie-parser");
const path = require("path");

const app = express();

const errorMiddleware = require("./middleware/error");

//CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookiesParser());
app.use(cors())


 app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });


//Route export
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute")


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1" , cart)





app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.js"));
// });

//middleware for error
app.use(errorMiddleware);

module.exports = app;
