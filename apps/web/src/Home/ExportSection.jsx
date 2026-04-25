import React from 'react';
import exportImg from "../assets/export.webp";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const ExportSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center bg-white container">
      {/* Left side - Image */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={exportImg}
          alt="Shipping containers"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start">
        {/* <h3 className="text-lg font-semibold text-gray-700 uppercase mb-4">
          Our Presence
        </h3> */}
         <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
           Exporting Premium Building Material Globally with Asios Global

        </h2>
        <p className="lg:text-[16px] text-sm mb-6 text-justify">
        At Asios Global, we specialize in delivering high-quality building materials to every corner of the world. Our extensive product range, including porcelain tiles, sanitary ware, wall & ceiling panels, etc. caters to diverse needs across global markets. With a dedication to superior quality and innovative designs, we offer embodies our commitment to excellence in craftsmanship and performance.

        </p>
        <p className="lg:text-[16px] text-sm mb-6 text-justify">
        Our strong logistics network and global supply chain capabilities enable us to export tiles efficiently and reliably to international destinations. Whether for residential, commercial, or industrial spaces, our building materials are crafted to enhance both the aesthetic and functional appeal of any environment. Partner with Asios Global for building materials that combine style, durability, and cost-effectiveness.
        </p>  
        <Link to="/export">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full shadow-lg"
        >
          Explore More
        </motion.button>
        </Link>
      </div>

      {/* Overlay - 50+ Export Countries */}
      <div className="absolute bottom-0 right-0 lg:right-12 mb-8 lg:mb-0 p-4 bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-center text-lg lg:text-2xl font-bold">
        50+ <br /> Export <br /> Country
      </div>
    </section>
  );
};

export default ExportSection;
