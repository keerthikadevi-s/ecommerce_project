import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // Import the CSS file

function Signup() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/admin/signup", {
        userId,
        email,
        password,
        repassword,
        accessKey,
      });
      console.log("Signup successful", response.data);
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  return (
    <div className="Signup">
      <header className="App-header">
        <h2>Signup</h2>
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
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <label>
              Re-enter Password:
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Access Key:
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Signup</button>
        </form>
      </header>
    </div>
  );
}

export default Signup;
