import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [userID, setUserID] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin/login", {
        userId: userID,
        password: pass,
      });
      if (response.status === 201) {
        alert(response.data.status);
        window.location.href = "/update-products";
      } else {
        alert(response.data.status);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="Login d-flex flex-column align-items-center justify-content-center vh-100">
      <header className="text-center">
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="form-group">
            <label htmlFor="userID">User ID:</label>
            <input
              type="text"
              id="userID"
              className="form-control"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Login
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
