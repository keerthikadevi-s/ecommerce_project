//Two types of Authentication -
//1 - Statefull - maintains state/data on server
//2 - Stateless - no state

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const connectMon = require("connectmon.js");
const restrictToLoggedIn = require("./middlewares/authmiddle.js");
const logReqRes = require("./middlewares/middle.js");
const adminRouter = require("./routes/admin.js")
const manageProducts = require("./routes/product.js")

//Connecting MongoDB
connectMon("mongodb://localhost:27017/e-commerce");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Admin functionalities
//Admin creation - post request
app.use("/admin",logReqRes("adminlog.txt"));
app.use("/admin", adminRouter);

//Products - addition, updation, deletion
app.use("/products",logReqRes("productlog.txt"));
app.use("/products", manageProducts);
app.use("/products/update", restrictToLoggedIn);

app.listen(PORT, ()=> {
    console.log(`Backend server is running on http://localhost:${PORT}`);

})