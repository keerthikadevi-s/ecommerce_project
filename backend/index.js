//Two types of Authentication -
//1 - Statefull - maintains state/data on server
//2 - Stateless - no state

//CORS - cross origin resource sharing

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

const connectMon = require("./connectmon.js");
const restrictToLoggedIn = require("./middlewares/authmiddle.js");
const logReqRes = require("./middlewares/middle.js");
const adminRouter = require("./routes/admin.js");
const manageProducts = require("./routes/product.js");

//Connecting MongoDB
connectMon(
  "mongodb+srv://keerthikadevis6:Ivo1SvrCykyAxHoM@cluster0.cwzekei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Admin functionalities
//Admin creation - post request
app.use("/admin", logReqRes("adminlog.txt"));
app.use("/admin", adminRouter);

//Products - addition, updation, deletion
// app.use("/products/update",express.json());
app.use("/products", logReqRes("productlog.txt"));
app.use("/products/update", restrictToLoggedIn);
app.use("/products", manageProducts);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
