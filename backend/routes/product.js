const express = require("express");
const router = express.Router();
const { getProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/product.js");

router
    .route("/")
    .get(getProduct);

router
    .route("/update")
    .patch(updateProduct)
    .delete(deleteProduct)
    .post(addProduct);
module.exports = router;