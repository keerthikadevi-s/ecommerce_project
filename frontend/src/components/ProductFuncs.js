const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
        alert("No product selected");
        return;
    }

    try {
        const response = await axios.put(`/products/update`, {
            productName,
            price,
            img,
        });
        console.log("Product updated:", response.data.message);
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
        alert("Product added:", response.data.message);
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
        console.error("No product selected");
        return;
    }

    try {
        await axios.delete(`/producrs/update`);
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

module.exports = {handleAdd, handleUpdate, handleDelete};