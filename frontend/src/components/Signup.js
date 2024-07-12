import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // Import the CSS file
// import { set } from "mongoose";


function Signup() {
  const [userID, setuserID] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [pass, setpass] = useState("");
  const [repass, setRepass] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(pass !== repass) {
      alert("passs do not match");
      return;
    }
    else if(accessKey !== "1234567890") {
      alert("Incorrect Access Key");
      return;
    }
    try {
      const response = await axios.post("/admin/signup", {
        userId : userID,
        email: adminEmail,
        password: pass
      });
      if(response.status === 201) {
        alert(response.data.status);
        window.location.href = "/login";
      }
      else {
        alert("Error during signup");
      }
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
            </label>
              <input
                type="text"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                />
            
          </div>
          <div>
            <label>
              Email:
            </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            
          </div>
          <div>
            <label>
              Password:
            </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
              />
          </div>
          <div>
            <label>
              Re-enter password:
            </label>
              <input
                type="password"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
              />
            
          </div>
          <div>
            <label for="accessKey">
              Access Key:
            </label>
              <input
                id="accessKey"
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            
          </div>
          <button type="submit">Signup</button>
        </form>
      </header>
    </div>
  );
}

export default Signup;
