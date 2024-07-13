import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
function Products() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await fetch("/products");
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="products">
        <button onClick={fetchProducts}>Fetch Products</button>
        <div className="all-products">
          {products.map((product) => (
            <ProductCard 
            key={product._id} 
            productName={product.productName}
            price = {product.price}
            img = {product.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
