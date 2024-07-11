import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import UpdateProducts from "./components/UpdateProducts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Welcome to the App</h1>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/update-products" element={<UpdateProducts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
