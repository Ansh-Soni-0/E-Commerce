import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/contact" element={<Contact />} />

        {/* dynamic fetch product from product id  */}
        <Route path="/product/:productId" element={<Product />} />

        <Route path="/collection" element={<Collection />} />

        <Route path="/place-order" element={<PlaceOrder />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
