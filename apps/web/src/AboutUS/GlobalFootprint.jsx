import React from "react";
import img from "../assets/countries.webp";
const GlobalFootprint = () => {
  return (
    <div className="container lg:pb-20 py-14">
      <h2 className="font-bold text-center mb-10">Global Footprint</h2>
      <img src={img} className="w-full" />
    </div>
  );
};

export default GlobalFootprint;
