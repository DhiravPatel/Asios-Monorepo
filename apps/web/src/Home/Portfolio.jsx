import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { AppContext } from "../AppContext";
import SkeletonLoader from "../SkeletonLoader";

const SKELETON_COUNT = 4;

const Portfolio = () => {
  const { categories, categoriesReady } = useContext(AppContext);
  const items = categories || [];
  const isLoading = !categoriesReady && items.length === 0;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="section bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="rule" />
              <span className="eyebrow">The Catalogue</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[56px] max-w-2xl leading-[1.05]">
              Surfaces curated <br />
              <span className="display-italic text-primary">by category.</span>
            </h2>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous"
              className="w-12 h-12 inline-flex items-center justify-center border border-sand-300 hover:border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next"
              className="w-12 h-12 inline-flex items-center justify-center border border-sand-300 hover:border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="-mx-6 md:-mx-10 lg:-mx-12 px-6 md:px-10 lg:px-12">
          <Swiper
            modules={[Navigation, Mousewheel, FreeMode]}
            slidesPerView={1.15}
            spaceBetween={20}
            freeMode={{ enabled: true, momentum: true }}
            mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
            speed={650}
            breakpoints={{
              640: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 28 },
              1280: { slidesPerView: 3.6, spaceBetween: 32 },
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <SwiperSlide key={`skeleton-${i}`}>
                    <div className="aspect-[3/4] w-full">
                      <SkeletonLoader width="100%" height="100%" />
                    </div>
                    <div className="mt-4">
                      <SkeletonLoader width="60%" height="14px" />
                    </div>
                  </SwiperSlide>
                ))
              : items.length > 0
              ? items.map((item, i) => (
                  <SwiperSlide key={item._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link to={`/main-product/${item._id}`} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                          <img
                            src={item.image || "fallback-image.jpg"}
                            alt={item.category}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                          <div className="absolute top-5 left-5">
                            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-white/90">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
                            <h3 className="display text-2xl md:text-3xl text-white leading-tight pr-4">
                              {item.category}
                            </h3>
                            <span className="w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shrink-0 transition-all duration-500 ease-editorial group-hover:bg-primary group-hover:text-white">
                              <FiArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </SwiperSlide>
                ))
              : (
                <SwiperSlide>
                  <p className="text-sand-500 text-[14px]">No collections available.</p>
                </SwiperSlide>
              )}
          </Swiper>
        </div>

        {/* All products link */}
        <div className="mt-10 md:mt-14 text-center">
          <Link to="/product" className="btn-link mx-auto">
            View All Products
            <FiArrowUpRight className="arrow w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
