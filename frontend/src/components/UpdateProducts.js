import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateProduct.css";
function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const fetchProducts = async () => {
    const response = await fetch("/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setPrice(product.price);
    setImg(product.img);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("No product selected");
      return;
    }

    try {
      const response = await axios.patch(
        `/products/update/${selectedProduct._id}`,
        {
          productName,
          price,
          img,
        }
      );
      alert(response.data.message);
      if (response.status === 404 || response.status === 401) {
        return;
      }
      fetchProducts();
      setSelectedProduct(null);
      setProductName("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/products/update", {
        productName,
        price,
        img,
      });

      alert(response.data.message);
      if (response.status === 400 || response.status === 401) {
        return;
      }
      fetchProducts();
      setSelectedProduct(null);
      setProductName("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("No product selected");
      return;
    }

    try {
      const response = await axios.delete(
        `/products/update/${selectedProduct._id}`
      );
      console.log(response.data);
      // setProducts(
      //   products.filter((product) => product._id !== selectedProduct._id)
      // );
      alert(response.data.message);
      if (response.status === 404 || response.status === 401) {
        return;
      }
      fetchProducts();
      setSelectedProduct(null);
      setProductName("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </label>
        </div>
        <div className="buttons">
          <button type="submit">Update Product</button>
          <button type="button" onClick={handleAdd}>
            Add Product
          </button>
          <button type="button" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} onClick={() => handleProductSelect(product)}>
            {product.productName} - Rs. {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateProduct;
