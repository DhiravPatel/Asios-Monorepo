import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import productCover from "../assets/product.webp";
import SkeletonLoader from "../SkeletonLoader";
import { AppContext } from "../AppContext";
import PageHero from "../PageHero";

const SKELETON_COUNT = 8;

const Product = () => {
  const { categories, categoriesReady } = useContext(AppContext);
  const items = categories || [];
  const isLoading = !categoriesReady && items.length === 0;

  return (
    <main>
      <PageHero
        image={productCover}
        eyebrow="The Catalogue"
        title="Surfaces curated"
        italicTitle="for every space."
        description="Explore our complete collection — porcelain tiles, quartz slabs, sanitaryware, decorative panels, and more."
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-10 md:mb-14 pb-5 border-b border-sand-200">
            <div>
              <span className="eyebrow">Collections</span>
              <h2 className="display text-3xl md:text-4xl mt-2">
                {isLoading ? "Loading collections" : `${items.length} ${items.length === 1 ? "category" : "categories"}`}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {isLoading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={`skeleton-${i}`}>
                  <div className="aspect-[3/4]">
                    <SkeletonLoader width="100%" height="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader width="60%" height="14px" />
                  </div>
                </div>
              ))
            ) : items.length > 0 ? (
              items.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/main-product/${item._id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                      <img
                        src={item.image || "fallback-image.jpg"}
                        alt={item.category}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                      <span className="absolute top-5 left-5 text-[10px] tracking-[0.22em] uppercase font-semibold text-white/90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-3">
                        <h3 className="display text-xl md:text-2xl text-white leading-tight pr-2 capitalize">
                          {item.category}
                        </h3>
                        <span className="w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shrink-0 transition-all duration-500 ease-editorial group-hover:bg-primary group-hover:text-white">
                          <FiArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 border border-dashed border-sand-300">
                <p className="text-sand-500 text-[15px]">No collections available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
