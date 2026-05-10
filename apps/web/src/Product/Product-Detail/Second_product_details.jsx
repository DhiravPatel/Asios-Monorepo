import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ImgsViewer from "react-images-viewer";
import { FiArrowUpRight, FiDownload, FiZoomIn, FiArrowLeft } from "react-icons/fi";
import InquiryModal from "./InquiryModal";
import SkeletonLoader from "../../SkeletonLoader";
import Breadcrumb from "../../Breadcrumb";
import { useGetProductById } from "../../hooks/Product/ProductHook";

const SPEC_LABELS = {
  size: "Size",
  thickness: "Thickness",
  surface: "Surface",
  model: "Model",
  grade: "Grade",
  packing: "Packing",
  weight: "Weight",
  application: "Application",
  type: "Type",
  color: "Colour",
};

const Second_product_details = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product;
  const { data: fetchedProduct } = useGetProductById(productFromState ? null : _id);
  const product = productFromState || fetchedProduct;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const productDetails = useMemo(() => {
    if (!product?.details) return {};
    if (typeof product.details === "string") {
      try {
        return JSON.parse(product.details);
      } catch {
        return {};
      }
    }
    return product.details;
  }, [product]);

  const categoryName = product?.category?.category || "";
  const subcategoryName = product?.subcategory?.subcategory || "";
  const categoryId = product?.category?._id;
  const subcategoryId = product?.subcategory?._id;

  const isFramedImage = useMemo(() => {
    if (!product) return false;
    return (
      (categoryName === "Tiles" &&
        subcategoryName !== "Wooden Strip Tiles" &&
        subcategoryName !== "Subway Tiles" &&
        subcategoryName !== "Elevation Wall Tiles") ||
      (categoryName === "Decorative Wall & Ceiling Panel" &&
        subcategoryName === "Soffit Ceiling Panel") ||
      categoryName === "Quartz Slab" ||
      categoryName === "Other Products"
    );
  }, [product, categoryName, subcategoryName]);

  const specs = useMemo(
    () =>
      Object.entries(SPEC_LABELS)
        .map(([key, label]) => ({ key, label, value: productDetails[key] }))
        .filter((s) => s.value),
    [productDetails]
  );

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
          {
            label: subcategoryName || "Series",
            to:
              categoryId && subcategoryId
                ? `/product/${categoryId}/${subcategoryId}`
                : undefined,
          },
          { label: product?.productName || "Product" },
        ]}
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-sand-600 hover:text-ink transition-colors mb-8"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {product ? (
                <div
                  className={`relative aspect-square w-full max-w-[460px] mx-auto lg:mx-0 overflow-hidden bg-sand-100 group cursor-zoom-in ${
                    isFramedImage ? "border border-sand-200" : ""
                  }`}
                  onClick={() => setViewerIsOpen(true)}
                >
                  <img
                    src={product.image}
                    alt={product.productName}
                    className={`w-full h-full transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03] ${
                      isFramedImage ? "object-cover" : "object-contain p-6"
                    }`}
                  />
                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-500 ease-editorial">
                    <FiZoomIn className="w-4 h-4" />
                  </span>
                </div>
              ) : (
                <div className="aspect-square max-w-[460px] mx-auto lg:mx-0">
                  <SkeletonLoader width="100%" height="100%" />
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              className="lg:col-span-7 lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow capitalize">
                  {categoryName || "—"}
                  {subcategoryName ? ` · ${subcategoryName}` : ""}
                </span>
              </div>
              <h1 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05] mb-8">
                {product ? product.productName : "Loading…"}
              </h1>

              {/* Spec table */}
              {product ? (
                specs.length > 0 ? (
                  <dl className="border-t border-sand-200">
                    {specs.map((s) => (
                      <div
                        key={s.key}
                        className="flex items-baseline gap-4 py-3.5 border-b border-sand-200"
                      >
                        <dt className="text-[10.5px] tracking-[0.22em] uppercase font-semibold text-sand-500 w-32 shrink-0">
                          {s.label}
                        </dt>
                        <dd className="text-[14.5px] text-ink leading-[1.6] flex-1">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-[14px] text-sand-500">
                    Specifications available on request.
                  </p>
                )
              ) : (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonLoader key={i} width="100%" height="36px" />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary"
                >
                  Product Inquiry
                </button>
                {productDetails.link && (
                  <button
                    type="button"
                    onClick={() => window.open(productDetails.link, "_blank")}
                    className="btn-link hover:!text-primary transition-colors duration-300"
                  >
                    View Brochure <FiDownload className="w-4 h-4" />
                  </button>
                )}
                <Link
                  to="/contact"
                  className="btn-link hover:!text-primary transition-colors duration-300"
                >
                  Contact Us <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product ? product.productName : ""}
      />

      {product && (
        <ImgsViewer
          imgs={[{ src: product.image }]}
          currImg={0}
          isOpen={viewerIsOpen}
          onClose={() => setViewerIsOpen(false)}
        />
      )}
    </main>
  );
};

export default Second_product_details;
