import React, { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import SkeletonLoader from "../../SkeletonLoader";
import { AppContext } from "../../AppContext";
import Breadcrumb from "../../Breadcrumb";
import { cldCard } from "../../utils/cloudinary";

const SKELETON_COUNT = 8;

const Main_Product_details = () => {
  const { categoryId } = useParams();
  const { categories, subcategories, subcategoriesReady } = useContext(AppContext);

  const category = useMemo(
    () => (categories || []).find((c) => c._id === categoryId),
    [categories, categoryId]
  );

  const filteredSubcategories = useMemo(
    () =>
      (subcategories || []).filter((sub) => {
        const subCatId = sub.category?._id || sub.category;
        return String(subCatId) === String(categoryId);
      }),
    [subcategories, categoryId]
  );

  const categoryName = category?.category || "Loading…";
  const isLoading = !subcategoriesReady && filteredSubcategories.length === 0;

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/product" },
          { label: categoryName },
        ]}
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Collection</span>
              </div>
              <h1 className="display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] capitalize">
                {categoryName}
              </h1>
            </div>
            <div className="text-[12px] tracking-[0.22em] uppercase text-sand-500">
              {isLoading
                ? "Loading…"
                : `${filteredSubcategories.length} ${
                    filteredSubcategories.length === 1 ? "series" : "series"
                  }`}
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
            ) : filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((sub, i) => (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/product/${categoryId}/${sub._id}`} className="group block">
                    {/* Image — clean, no overlay text */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                      <img
                        src={cldCard(sub.image) || "fallback-image.jpg"}
                        alt={sub.subcategory}
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
                          Series · {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="display text-2xl md:text-[26px] leading-tight capitalize group-hover:text-primary transition-colors duration-500">
                          {sub.subcategory}
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
                <p className="text-sand-500 text-[15px]">
                  No series available for this collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main_Product_details;
