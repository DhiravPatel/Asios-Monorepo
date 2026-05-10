import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import productCover from "../assets/product.webp";
import SkeletonLoader from "../SkeletonLoader";
import { AppContext } from "../AppContext";
import PageHero from "../PageHero";
import { cldCard } from "../utils/cloudinary";

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
                    {/* Image — clean, no overlay text */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                      <img
                        src={cldCard(item.image) || "fallback-image.jpg"}
                        alt={item.category}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                    </div>

                    {/* Editorial name plate */}
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-sand-500 mb-2">
                          Collection · {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="display text-2xl md:text-[26px] leading-tight capitalize group-hover:text-primary transition-colors duration-500">
                          {item.category}
                        </h3>
                        <div className="mt-3 h-px w-10 bg-sand-300 group-hover:w-24 group-hover:bg-primary transition-all duration-700 ease-editorial" />
                      </div>
                      <FiArrowUpRight className="w-6 h-6 shrink-0 text-ink/60 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 ease-editorial" />
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
