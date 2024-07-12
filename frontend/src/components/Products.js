import React from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await fetch("/products");
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }

  return (
    <div>
      <h2>Products</h2>
      <div>
        <button onClick={fetchProducts}>Fetch Products</button>
        <div className="all-products">
          {/* {products.map((product) => {
            return <ProductCard props={product} />;
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Products;
