import React from "react";
import { motion } from "framer-motion";
import exportHeader from "../assets/export-header.webp"
import exportPage from "../assets/export-page.webp"
import GlobalFootprint from "../AboutUS/GlobalFootprint";



const Export = () => {
  return (
    <>
      <div className="relative h-[600px]">
        <img
            src={exportHeader}
          className="h-full w-full object-cover"
          alt="Contact Banner"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold text-center">
            Our Export
          </h1>
        </motion.div>
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-center bg-white container">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src={exportPage}
            alt="Shipping containers"
           className="object-cover w-full h-full mt-2 lg:mt-0"
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
        <p className="text-gray-600 leading-relaxed mb-6 text-justify">
        At Asios Global, we specialize in delivering high-quality building materials to every corner of the world. Our extensive product range, including porcelain tiles, sanitary ware, wall & ceiling panels, etc. caters to diverse needs across global markets. With a dedication to superior quality and innovative designs, we offer embodies our commitment to excellence in craftsmanship and performance.

        </p>
        <p className="text-gray-600 leading-relaxed mb-6 text-justify">
        Our strong logistics network and global supply chain capabilities enable us to export tiles efficiently and reliably to international destinations. Whether for residential, commercial, or industrial spaces, our building materials are crafted to enhance both the aesthetic and functional appeal of any environment. Partner with Asios Global for building materials that combine style, durability, and cost-effectiveness.
        </p>
        </div>

        {/* <div className="absolute bottom-0 right-0 lg:right-12 mb-8 lg:mb-0 p-4 bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-center text-lg lg:text-2xl font-bold">
          50+ <br /> Export <br /> Country
        </div> */}
      </section>

        <GlobalFootprint />
    </>
  );
};

export default Export;
