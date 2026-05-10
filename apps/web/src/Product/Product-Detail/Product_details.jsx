import React, { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import SkeletonLoader from "../../SkeletonLoader";
import { useGetProductsBySubCategoryId } from "../../hooks/Product/ProductHook";
import { AppContext } from "../../AppContext";
import Breadcrumb from "../../Breadcrumb";
import { cldCard } from "../../utils/cloudinary";

const SKELETON_COUNT = 8;

const Product_details = () => {
  const { categoryId, subcategoryId } = useParams();
  const { data: products, loading } = useGetProductsBySubCategoryId(subcategoryId);
  const { categoryById, subcategoryById } = useContext(AppContext);

  const category = categoryById?.get(categoryId);
  const subcategory = subcategoryById?.get(subcategoryId);
  const categoryName =
    category?.category || products?.[0]?.category?.category || "";
  const subcategoryName =
    subcategory?.subcategory || products?.[0]?.subcategory?.subcategory || "";

  const isFramedCategory = useMemo(() => {
    if (!products || products.length === 0) return false;
    const p = products[0];
    const catName = p.category?.category;
    const subName = p.subcategory?.subcategory;
    return (
      (catName === "Tiles" &&
        subName !== "Wooden Strip Tiles" &&
        subName !== "Subway Tiles" &&
        subName !== "Elevation Wall Tiles") ||
      (catName === "Decorative Wall & Ceiling Panel" &&
        subName === "Soffit Ceiling Panel") ||
      catName === "Quartz Slab" ||
      (catName === "Other Products" && subName !== "ROOFING SHEET")
    );
  }, [products]);

  const isLoading = loading || (!products?.length && loading);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/product" },
          {
            label: categoryName || "Collection",
            to: categoryId ? `/main-product/${categoryId}` : undefined,
          },
          { label: subcategoryName || "Series" },
        ]}
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow capitalize">{categoryName || "Series"}</span>
              </div>
              <h1 className="display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] capitalize">
                {subcategoryName || "Loading…"}
              </h1>
            </div>
            <div className="text-[12px] tracking-[0.22em] uppercase text-sand-500">
              {isLoading
                ? "Loading…"
                : `${products?.length || 0} ${
                    (products?.length || 0) === 1 ? "product" : "products"
                  }`}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {isLoading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={`skeleton-${i}`}>
                  <div className="aspect-square">
                    <SkeletonLoader width="100%" height="100%" />
                  </div>
                  <div className="mt-3">
                    <SkeletonLoader width="60%" height="14px" />
                  </div>
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.map((product, i) => (
                <motion.article
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <Link
                    to={`/product-detail/${product._id}`}
                    state={{ product }}
                    className="block"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden ${
                        isFramedCategory
                          ? "bg-sand-100 border border-sand-200"
                          : "bg-sand-100"
                      }`}
                    >
                      <img
                        src={cldCard(product.image) || "fallback-image.jpg"}
                        alt={product.productName}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full transition-transform duration-[1200ms] ease-editorial group-hover:scale-105 ${
                          isFramedCategory ? "object-cover" : "object-contain p-4"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                      <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-soft opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-editorial">
                        <FiArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-[14px] tracking-[0.18em] uppercase font-semibold text-ink group-hover:text-primary transition-colors">
                      {product.productName}
                    </h3>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 border border-dashed border-sand-300">
                <p className="text-sand-500 text-[15px]">
                  No products available for this series.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product_details;
