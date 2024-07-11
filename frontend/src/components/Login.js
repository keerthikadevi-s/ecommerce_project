import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin/login", {
        userId,
        password,
      });
      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="Login">
      <header className="App-header">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              User ID:
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
