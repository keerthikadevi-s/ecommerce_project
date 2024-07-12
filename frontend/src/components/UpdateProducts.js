import React, { useState } from "react";
import axios from "axios";

function UpdateProducts() {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  const updateProduct = () => {
    axios
      .put(`/api/products/${productId}`, { name: productName })
      .then((response) => {
        console.log("Product updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <h2>Update Products</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={updateProduct}>Update Product</button>
    </div>
  );
}

export default UpdateProducts;
