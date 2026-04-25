import React, { useContext } from "react";
import product from "../assets/product.webp"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SkeletonLoader from "../SkeletonLoader";
import { AppContext } from "../AppContext";

const Product = () => {
  const { categories } = useContext(AppContext);
  const productData = categories || [];

  return (
    <>
      <div className="relative h-[600px]">
        <img
          src={product}
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
            Our Products
          </h1>
        </motion.div>
      </div>
      <div className="container">
        <div className="flex flex-wrap gap-3 gap-y-4 justify-center items-start my-5">
        {productData.length > 0 ? (
        productData.map((data) => (
          <div className="relative group overflow-hidden cursor-pointer" key={data._id}>
            <Link to={`/main-product/${data._id}`}>
              <img
                src={data.image || "fallback-image.jpg"}
                className="md:w-[400px] md:h-[400px] w-[350px] h-[350px] object-cover"
                alt={data.category}
              />
              <div className="absolute bottom-0 w-full text-center bg-[#A42832] text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {data.category}
              </div>
            </Link>
          </div>
        ))
      ) : (
        Array.from({ length: 10 }).map((_, index) => (
          <div
            className="relative group overflow-hidden cursor-pointer"
            key={index}
          >
            <SkeletonLoader width="350px" height="350px" />
            <div className="absolute bottom-0 w-full text-center bg-[#232323] text-white p-2 transform translate-y-full transition-transform duration-300">
              <SkeletonLoader width="100px" height="20px" />
            </div>
          </div>
        ))
      )}
        </div>
      </div>
    </>
  );
};

export default Product;
