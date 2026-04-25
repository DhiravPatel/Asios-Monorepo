import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Portfolio = () => {
  const { categories } = useContext(AppContext);
  const portfoliodata = categories || [];

  return (
    <div className="container py-20">
      <motion.div
        className="font-bold md:text-4xl sm:text-2xl text-xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Product
      </motion.div>
      <div className="mt-4 py-4 hidden lg:block">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={4}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          mousewheel={{ releaseOnEdges: true }}
          freeMode={true}
          watchOverflow={true}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Mousewheel]}
        >
          {portfoliodata.length > 0 ? (
            portfoliodata.map((item) => (
              <SwiperSlide key={item._id}>
                <Link to={`/main-product/${item._id}`}>
                  <div className="relative">
                    <img
                      src={item.image || "fallback-image.jpg"}
                      alt={item.category}
                      className="sm:w-[250px] sm:h-[250px] md:w-[330px] md:h-[450px] w-[400px] h-[400px] object-cover hover:opacity-90"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-left pl-6">
                      <p className="font-bold text-white">{item.category}</p>
                      <button className="button mt-2 bg-blue-500 text-white py-1 px-3 rounded">
                        {item.category}
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </Swiper>
      </div>
      <div className="mt-4 py-4 lg:hidden ">
        <div className="flex flex-wrap gap-3 gap-y-4 justify-center items-start my-5 ">
          {portfoliodata.length > 0 ? (
            portfoliodata.map((item) => (
              <Link key={item._id} to={`/main-product/${item._id}`}>
                <div className="relative group overflow-hidden cursor-pointer">
                  <img
                    src={item.image || "fallback-image.jpg"}
                    alt={item.category}
                    className=" h-[350px] md:w-[400px] md:h-[400px] w-[350px] "
                  />
                    <p className="font-bold text-white">{item.category}</p>
                    <div className="absolute bottom-0 w-full text-center bg-[#A42832] text-white p-2">
                      {item.category}
                    </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
