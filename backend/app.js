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

//Route export
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute")


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1" , cart)



app.use(cors())

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.js"));
});

//middleware for error
app.use(errorMiddleware);

module.exports = app;
