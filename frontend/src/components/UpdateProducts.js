// import { set } from "mongoose";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function UpdateProducts() {
  const [prname, setPrname] = useState("");
  const [prprice, setPrprice] = useState(0);
  const [primg, setPrimg] = useState("");

  async function handleAdd(object){
    let response = await axios.post("/products/update",object);
    return response;
  }

  async function handleUpdate(object){
    let response = await axios.patch("/products/update", object);
    return response;
  }
  async function handleDelete(object){
    let response = await axios.delete("/products/update", object);
    return response;
  }

  async function handleSubmit(e){
    e.preventDefault();
    let response;
    const object = {
      productName: prname,
      price: prprice,
      img: primg
    };

    if(e.target.innerHTML === "Add"){
      response = await handleAdd(object);
    }
    else if(e.target.innerHTML === "Update"){
      response = await handleUpdate(object);
    }
    else if(e.target.innerHTML === "Delete"){
      response = await handleDelete(object);
    }
      
    if (response.status === 401) {
      alert(response.data.status);
      window.location.href = "/login";
    }
    else {
      alert(response.data.status);
      setPrname("");
      setPrprice(0);
      setPrimg("");
    }
  }

  useEffect(() => {
    if (!document.cookie.includes("sessionId")) {
      alert("You won't be able to update products without logging in. Please login as admin.");
    }
  }, []);

  return (
    <div>
      <h2>Update Products</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product name:
            <input
              type="text"
              value={prname}
              onChange={(e) => setPrname(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="text"
              value={prprice}
              onChange={(e) => setPrprice(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Image link:
            <input
              type="text"
              value={primg}
              onChange={(e) => setPrimg(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
        <button type="submit">Update</button>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default UpdateProducts;

