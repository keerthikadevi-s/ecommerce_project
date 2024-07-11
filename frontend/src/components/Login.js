import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file

function Login() {
  const [userID, setUserID] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin/login", {
        userId : userID,
        password: pass
      });
      if(response.status === 201) {
        alert(response.data.status);
        window.location.href = "/update-products";
      }
      else {
        alert(response.data.status);
      }
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
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
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
