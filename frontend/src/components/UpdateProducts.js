import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    // Fetch all products on component mount
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

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
      console.error("No product selected");
      return;
    }

    try {
      const response = await axios.put(`/api/products/${selectedProduct._id}`, {
        productName,
        price,
        img,
      });
      console.log("Product updated:", response.data);
      // Optionally, refresh the product list after update
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === response.data._id ? response.data : p
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/products", {
        productName,
        price,
        img,
      });
      console.log("Product added:", response.data);
      setProducts([...products, response.data]);
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
      console.error("No product selected");
      return;
    }

    try {
      await axios.delete(`/api/products/${selectedProduct._id}`);
      console.log("Product deleted");
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setSelectedProduct(null);
      setProductName("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
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
        <div>
          <button type="submit">Update Product</button>
          <button onClick={handleAdd}>Add Product</button>
          <button onClick={handleDelete}>Delete Product</button>
        </div>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} onClick={() => handleProductSelect(product)}>
            {product.productName} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateProduct;
