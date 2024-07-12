import React from "react";
import "./ProductCard.css";

const ProductCard = ({productName, price, img}) => {
  return (
    <div className="product-container" >
      <img src={img} alt={productName} className="product-image" />
      <div className="product-desc">
        <h3>{productName}</h3>
        <p>Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
