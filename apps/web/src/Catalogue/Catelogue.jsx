import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiEye, FiZoomIn } from "react-icons/fi";
import banner from "../assets/catelogue-bg.webp";
import Category from "./Category";
import { useGetAllCatalogue } from "../hooks/Catalogue/CatalogueHook";
import PageHero from "../PageHero";
import SkeletonLoader from "../SkeletonLoader";

const SKELETON_COUNT = 8;

const Catelogue = () => {
  const { data: allCatalogues, loading } = useGetAllCatalogue();
  const [catalogues, setCatalogues] = useState([]);

  useEffect(() => {
    if (allCatalogues && allCatalogues.length > 0) {
      setCatalogues(allCatalogues);
    }
  }, [allCatalogues]);

  const fetchCataloguesBySubcategory = (selectedSubcategoryIds) => {
    if (!allCatalogues) return;
    if (selectedSubcategoryIds.length === 0) {
      setCatalogues(allCatalogues);
    } else {
      const filtered = allCatalogues.filter((c) => {
        const subId = c.cataloguesubcategory?._id || c.cataloguesubcategory;
        return selectedSubcategoryIds.includes(String(subId));
      });
      setCatalogues(filtered);
    }
  };

  const handleDownload = (driveLink) => {
    const fileIdMatch = driveLink.match(/[-\w]{25,}/);
    if (!fileIdMatch) return;
    const fileId = fileIdMatch[0];
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (link) => window.open(link, "_blank");

  return (
    <main>
      <PageHero
        image={banner}
        eyebrow="E-Catalogue"
        title="Browse the"
        italicTitle="full catalogue."
        description="Download or preview detailed product brochures organised by collection. Updated regularly with new finishes and formats."
        height="medium"
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <Category onSelectSubcategory={fetchCataloguesBySubcategory} />
            </aside>

            {/* Catalogue grid */}
            <div className="lg:col-span-9">
              <div className="flex items-end justify-between gap-4 mb-8 pb-5 border-b border-sand-200">
                <div>
                  <span className="eyebrow">Catalogue</span>
                  <h2 className="display text-3xl md:text-4xl mt-2">
                    {catalogues.length} {catalogues.length === 1 ? "title" : "titles"} available
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {loading
                  ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                      <div key={`skeleton-${i}`}>
                        <div className="aspect-[3/4]">
                          <SkeletonLoader width="100%" height="100%" />
                        </div>
                        <div className="mt-3">
                          <SkeletonLoader width="70%" height="14px" />
                        </div>
                      </div>
                    ))
                  : catalogues.length > 0
                  ? catalogues.map((item, i) => (
                      <motion.article
                        key={item.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex flex-col"
                      >
                        <button
                          type="button"
                          onClick={() => handleView(item.link)}
                          aria-label={`View ${item.name} catalogue`}
                          className="relative aspect-[3/4] overflow-hidden bg-sand-100 cursor-pointer text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                          <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-soft opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-editorial">
                            <FiZoomIn className="w-4 h-4" />
                          </span>
                        </button>

                        <div className="mt-5 flex items-start justify-between gap-4">
                          <h3 className="display text-xl md:text-[22px] leading-tight group-hover:text-primary transition-colors pt-0.5 min-w-0">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleView(item.link)}
                              aria-label={`View ${item.name}`}
                              className="relative w-9 h-9 inline-flex items-center justify-center border border-sand-300 text-ink/80 hover:text-white hover:bg-ink hover:border-ink transition-colors duration-300"
                            >
                              <FiEye className="w-[15px] h-[15px]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownload(item.link)}
                              aria-label={`Download ${item.name}`}
                              className="relative w-9 h-9 inline-flex items-center justify-center border border-sand-300 text-ink/80 hover:text-white hover:bg-primary hover:border-primary transition-colors duration-300"
                            >
                              <FiDownload className="w-[15px] h-[15px]" />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))
                  : (
                    <div className="col-span-full text-center py-20 border border-dashed border-sand-300">
                      <p className="text-sand-500 text-[15px]">No catalogues match the selected filter.</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Catelogue;
