

const express  = require("express");
const app = express();
const ErrorHandle = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://be-ndshop.vercel.app",
  credentials: true,
}));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  // }

//import router
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const order  = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const category= require("./controller/categories");
// const payment = require("./controller/payment")
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/category", category);
// app.use("/api/v2/payment", payment);

//it's for ErrorHandling
app.use(ErrorHandle);

module.exports = app;