import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiDownload,
  FiEye,
  FiZoomIn,
  FiArrowUpRight,
  FiPlus,
  FiMinus,
  FiCheck,
} from "react-icons/fi";
import banner from "../assets/catelogue-bg.webp";
import Category from "./Category";
import { useGetAllCatalogue } from "../hooks/Catalogue/CatalogueHook";
import PageHero from "../PageHero";
import SkeletonLoader from "../SkeletonLoader";

const SKELETON_COUNT = 8;

const insidePoints = [
  {
    index: "01",
    title: "Curated Designs",
    desc: "Every active SKU photographed in context — colour, finish, scale shown the way a designer would specify it.",
  },
  {
    index: "02",
    title: "Technical Specifications",
    desc: "Dimensions, thickness, surface, suitable applications, and water absorption for each format.",
  },
  {
    index: "03",
    title: "Installation Guidance",
    desc: "Pattern recommendations, joint widths, expansion notes, and movement advice — the way we install on our floor.",
  },
  {
    index: "04",
    title: "Care & Maintenance",
    desc: "Cleaning protocols, sealant guidance, and wear expectations across residential and commercial use.",
  },
];

const faqs = [
  {
    q: "Is the catalogue free to download?",
    a: "Always. All PDFs on this page are free, no signup required. Click a cover to view, or use the download icon to save a copy.",
  },
  {
    q: "How often is the catalogue updated?",
    a: "We refresh active editions quarterly with new finishes and formats, and publish a major revision annually. The cover year reflects the most recent revision.",
  },
  {
    q: "Can I request a printed copy?",
    a: "Yes. We ship printed catalogues to architects, designers, and serious buyers worldwide. Request via the form below or our Contact page — please include your shipping address.",
  },
  {
    q: "Do you have catalogues in other languages?",
    a: "English editions are available now. Arabic, Spanish, and French translations of our flagship volumes are in production — please ask about availability for your market.",
  },
  {
    q: "Are prices listed inside the catalogue?",
    a: "No. Pricing depends on quantity, format, finish, and destination port. Send us your specifications via the Contact page for an indicative quote within one business day.",
  },
  {
    q: "Can I get a customised catalogue under my brand?",
    a: "Yes — private-label catalogues are available for partners running their own showrooms or distribution. See our Customization page for the full scope.",
  },
];

const Catelogue = () => {
  const { data: allCatalogues, loading } = useGetAllCatalogue();
  const [catalogues, setCatalogues] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (allCatalogues && allCatalogues.length > 0) {
      setCatalogues(allCatalogues);
    }
  }, [allCatalogues]);

  const featured = useMemo(
    () => (allCatalogues && allCatalogues.length > 0 ? allCatalogues[0] : null),
    [allCatalogues]
  );

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

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? -1 : i);

  return (
    <main>
      <PageHero
        image={banner}
        eyebrow="E-Catalogue"
        title="The Asios"
        italicTitle="library."
        description="Detailed product brochures organised by collection. Free to download, free to share, updated quarterly."
        height="medium"
      />

      {/* FEATURED — latest edition spread */}
      {featured && (
        <section className="section bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Cover */}
              <motion.div
                className="lg:col-span-7 order-2 lg:order-1"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => handleView(featured.link)}
                  aria-label={`View ${featured.name}`}
                  className="group relative block w-full text-left"
                >
                  <div className="relative">
                    <div className="absolute -bottom-5 -left-5 w-36 h-36 md:w-48 md:h-48 bg-primary/95 hidden md:block" />
                    <div className="relative aspect-[4/5] max-h-[640px] mx-auto overflow-hidden bg-sand-100">
                      <img
                        src={featured.image}
                        alt={featured.name}
                        className="w-full h-full object-cover transition-transform duration-[1500ms] ease-editorial group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                      <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-soft opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-editorial">
                        <FiZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Copy */}
              <motion.div
                className="lg:col-span-5 order-1 lg:order-2"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule" />
                  <span className="eyebrow">Spotlight</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center text-[10px] tracking-[0.22em] uppercase font-semibold text-white bg-primary px-3 py-1.5">
                    Latest Edition
                  </span>
                  <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-sand-500">
                    Vol. 01 · 2026 Edition
                  </span>
                </div>
                <h2 className="display text-4xl md:text-5xl lg:text-[52px] mb-6 leading-[1.05] capitalize">
                  {featured.name}
                </h2>
                <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-8">
                  Our most recent volume — every active SKU photographed, specified, and laid out
                  in the way a designer would actually use it. Updated quarterly with new finishes
                  and formats as they arrive on our floor.
                </p>

                <div className="flex flex-col gap-3 mb-10">
                  <div className="flex items-center gap-3 text-[13.5px] text-sand-700">
                    <FiCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>High-resolution PDF · ready for print or screen</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13.5px] text-sand-700">
                    <FiCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Free to download · no signup required</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13.5px] text-sand-700">
                    <FiCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Printed copy available on request</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleDownload(featured.link)}
                    className="btn-primary"
                  >
                    <FiDownload className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => handleView(featured.link)}
                    className="btn-link hover:!text-primary transition-colors duration-300"
                  >
                    Preview Online
                    <FiEye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* WHAT'S INSIDE */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">What's Inside</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] max-w-2xl leading-[1.05]">
                More than <span className="display-italic text-primary">just photos.</span>
              </h2>
            </div>
            <p className="text-[15px] text-sand-600 leading-[1.8] max-w-md">
              Each Asios catalogue is structured the way a specifier reads — design first,
              technical detail next, installation and care after.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-0 border-t border-l border-sand-200">
            {insidePoints.map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white p-8 md:p-10 border-b border-r border-sand-200 hover:bg-cream transition-colors duration-500 flex flex-col min-h-[260px]"
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="display text-2xl text-sand-300 group-hover:text-primary transition-colors duration-500">
                    {p.index}
                  </span>
                </div>
                <h3 className="display text-2xl md:text-[26px] leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-[14px] text-sand-600 leading-[1.8] flex-1">{p.desc}</p>
                <div className="mt-6 w-8 h-px bg-sand-300 group-hover:bg-primary group-hover:w-12 transition-all duration-500 ease-editorial" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE GRID */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <Category onSelectSubcategory={fetchCataloguesBySubcategory} />
            </aside>

            {/* Catalogue grid */}
            <div className="lg:col-span-9">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-5 border-b border-sand-200">
                <div>
                  <span className="eyebrow">All Editions</span>
                  <h2 className="display text-3xl md:text-4xl mt-2">
                    {catalogues.length} {catalogues.length === 1 ? "title" : "titles"}{" "}
                    <span className="display-italic text-primary">available.</span>
                  </h2>
                </div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-sand-500">
                  Updated 2026
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {loading ? (
                  Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <div key={`skeleton-${i}`}>
                      <div className="aspect-[3/4]">
                        <SkeletonLoader width="100%" height="100%" />
                      </div>
                      <div className="mt-3">
                        <SkeletonLoader width="70%" height="14px" />
                      </div>
                    </div>
                  ))
                ) : catalogues.length > 0 ? (
                  catalogues.map((item, i) => (
                    <motion.article
                      key={item.id || i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
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
                ) : (
                  <div className="col-span-full text-center py-20 border border-dashed border-sand-300">
                    <p className="text-sand-500 text-[15px]">
                      No catalogues match the selected filter.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINT EDITION CTA */}
      <section className="section bg-ink text-white relative overflow-hidden">
        {/* ambient red gradient shadows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* top edge shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          {/* upper red glows */}
          <div className="absolute -top-24 -left-20 w-[520px] h-[320px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -top-32 left-1/3 w-[600px] h-[300px] bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute -top-16 right-0 w-[480px] h-[280px] bg-primary/12 rounded-full blur-3xl" />
          {/* center wash */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/[0.05] rounded-full blur-3xl" />
          {/* bottom red glows */}
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[400px] bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 w-[600px] h-[360px] bg-primary/12 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] bg-primary/18 rounded-full blur-3xl" />
          {/* bottom edge shimmer line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="rule rule-light !w-10" />
                <span className="eyebrow eyebrow-light !text-white">Print Edition</span>
              </div>
              <h2 className="display !text-white text-4xl md:text-5xl lg:text-[60px] leading-[1.05] mb-6">
                Prefer it in <span className="display-italic text-primary">your hands?</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.85] max-w-xl mb-4">
                We ship printed catalogues to architects, designers, and specifiers anywhere in
                the world. Heavy paper, sewn binding — the kind of thing that sits on a sample
                table without curling.
              </p>
              <p className="text-[14px] text-white/55 leading-[1.85] max-w-xl">
                Free for established partners. Indicative shipping cost for first-time requests,
                refundable against the first commercial order.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-10 flex flex-col gap-6 lg:items-end">
              <Link to="/contact" className="btn-primary btn-primary--invert">
                Request a Printed Copy
              </Link>
              <Link
                to="/sample-request"
                className="btn-link btn-link--light hover:!text-primary"
              >
                Request a Sample
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Questions</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[48px] leading-[1.05] mb-6">
                Things people <br />
                <span className="display-italic text-primary">ask us.</span>
              </h2>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-8 max-w-md">
                The honest answers to the questions that come up before someone downloads.
                Anything missing? Write to us.
              </p>
              <Link to="/contact" className="btn-link">
                Ask a Different Question
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-sand-300">
                {faqs.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border-b border-sand-300">
                      <button
                        type="button"
                        onClick={() => toggleFaq(i)}
                        aria-expanded={isOpen}
                        className="w-full text-left flex items-start justify-between gap-6 py-6 group"
                      >
                        <span className="display text-xl md:text-[22px] leading-tight pr-6 text-ink group-hover:text-primary transition-colors">
                          {item.q}
                        </span>
                        <span
                          className={`shrink-0 w-9 h-9 inline-flex items-center justify-center border transition-colors duration-300 mt-1 ${
                            isOpen
                              ? "bg-ink border-ink text-white"
                              : "border-sand-400 text-ink group-hover:bg-ink group-hover:border-ink group-hover:text-white"
                          }`}
                        >
                          {isOpen ? (
                            <FiMinus className="w-3.5 h-3.5" />
                          ) : (
                            <FiPlus className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-editorial overflow-hidden ${
                          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="text-[14.5px] text-sand-600 leading-[1.85] pr-12 max-w-2xl">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Catelogue;
