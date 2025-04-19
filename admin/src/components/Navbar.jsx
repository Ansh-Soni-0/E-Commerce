import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img 
      className="w-[max(10%,80px)]"
      src={assets.logo} 
      alt="admin-logo" />
      <button
      onClick={() => setToken('')}
      className="bg-red-700 text-white px-5 py-2 sm:py-2 rounded-full text-xl font-medium sm:text-sm cursor-pointer active:bg-red-800 hover:scale-105 transition-all hover:shadow-md">Logout</button>
    </div>
  );
};

export default Navbar;
