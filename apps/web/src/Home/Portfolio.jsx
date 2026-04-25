import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useGetAllCategories } from "../hooks/Category/CategoryHook";

const Portfolio = () => {
  const { setFooterData } = useContext(AppContext);
  const { data: portfoliodata } = useGetAllCategories();

  useEffect(() => {
    if (portfoliodata && portfoliodata.length > 0) {
      setFooterData(portfoliodata);
    }
  }, [portfoliodata, setFooterData]);

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
            portfoliodata.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={`/main-product/${item.category}`}>
                  <div className="relative">
                    <img
                      src={item.image || "fallback-image.jpg"}
                      alt={item.title}
                      // className="w-full h-[400px] object-cover"
                      // className="sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] w-full h-[300px] object-cover hover:opacity-90"
                      className="sm:w-[250px] sm:h-[250px] md:w-[330px] md:h-[450px] w-[400px] h-[400px] object-cover hover:opacity-90"

                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-left pl-6">
                      <p className="font-bold text-white">{item.title}</p>
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
        {/* <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {portfoliodata.length > 0 ? (
                        portfoliodata.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='relative'>
                                    <img src={item.image || 'fallback-image.jpg'} alt={item.title} className='w-full h-[200px] object-cover' />
                                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-left pl-6'>
                                        <p className='font-bold text-white'>{item.title}</p>
                                        <button className='button mt-2 bg-blue-500 text-white py-1 px-3 rounded'>
                                        {item.category}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </Swiper> */}
        <div className="flex flex-wrap gap-3 gap-y-4 justify-center items-start my-5 ">
          {portfoliodata.length > 0 ? (
            portfoliodata.map((item, index) => (
              <>
              <Link to={`/main-product/${item.category}`}>
                <div className="relative group overflow-hidden cursor-pointer">
                  <img
                    src={item.image || "fallback-image.jpg"}
                    alt={item.title}
                    className=" h-[350px] md:w-[400px] md:h-[400px] w-[350px] "
                  />
                    <p className="font-bold text-white">{item.title}</p>
                    <div className="absolute bottom-0 w-full text-center bg-[#A42832] text-white p-2">
                      {item.category}
                    </div>
                </div>
                </Link>
              </>
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
