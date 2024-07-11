
import React from 'react';

const ProductCard = (props) => {
    return (
        <div className='product-container' key={props.product._id}>
            <img alt={props.product.productName} className='product-image' />
            <div className='product-desc'>
                <h3>{props.product.productName}</h3>
                <p>{props.product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
