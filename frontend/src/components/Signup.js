import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Signup.css"; // Import your custom CSS if needed

function Signup() {
  const [userID, setuserID] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [pass, setpass] = useState("");
  const [repass, setRepass] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== repass) {
      alert("Passwords do not match");
      return;
    } else if (accessKey !== "1234567890") {
      alert("Incorrect Access Key");
      return;
    }

    try {
      const response = await axios.post("/admin/signup", {
        userId: userID,
        email: adminEmail,
        password: pass,
      });
      if (response.status === 201) {
        alert(response.data.status);
        window.location.href = "/login";
      } else {
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
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="form-group row">
            <label htmlFor="userID" className="col-sm-2 col-form-label">
              User ID:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="userID"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="adminEmail" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="pass" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="pass"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="repass" className="col-sm-2 col-form-label">
              Re-enter password:
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="repass"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="accessKey" className="col-sm-2 col-form-label">
              Access Key:
            </label>
            <div className="col-sm-10">
              <input
                id="accessKey"
                type="text"
                className="form-control"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </header>
    </div>
  );
}

export default Signup;
