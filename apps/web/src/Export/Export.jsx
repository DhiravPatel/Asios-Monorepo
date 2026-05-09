import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import exportHeader from "../assets/export-header.webp";
import exportPage from "../assets/export-page.webp";
import GlobalFootprint from "../AboutUS/GlobalFootprint";
import PageHero from "../PageHero";

const capabilities = [
  {
    index: "01",
    title: "Sourcing & Coordination",
    desc: "Direct manufacturer relationships across Morbi mean material parity, transparent costing, and accountability at every stage of production.",
  },
  {
    index: "02",
    title: "Quality Inspection",
    desc: "Pre-production, in-line, and pre-shipment checks. We catch deviations before they reach the container, not after the customs clearance.",
  },
  {
    index: "03",
    title: "Logistics & Documentation",
    desc: "Container loading supervision, customs paperwork, and shipping line coordination — handled by a desk that responds in your timezone.",
  },
  {
    index: "04",
    title: "After-Sale Support",
    desc: "From sample replacement to claims handling, we stay on the line until the project closes. Long-term partnerships, not transactional shipments.",
  },
];

const Export = () => {
  return (
    <main>
      <PageHero
        image={exportHeader}
        eyebrow="Global Reach"
        title="Crafted in Morbi,"
        italicTitle="shipped worldwide."
        description="Premium building materials delivered to fifty-plus markets with the precision your project deserves."
      />

      {/* Intro split */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <motion.div
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute -bottom-5 -right-5 w-36 h-36 md:w-48 md:h-48 bg-primary/95 hidden md:block" />
                <img
                  src={exportPage}
                  alt="Asios shipping operations"
                  className="relative w-full h-[420px] lg:h-[560px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="rule" />
                <span className="eyebrow">Premium Export</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] mb-7 leading-[1.05]">
                Building material, <br />
                <span className="display-italic text-primary">delivered globally.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
                At Asios Global, we specialise in delivering high-quality building materials to every
                corner of the world. Our extensive product range — porcelain tiles, sanitary ware,
                wall and ceiling panels — caters to diverse needs across global markets.
              </p>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-10">
                A robust logistics network and global supply chain enable reliable export to
                international destinations. For residential, commercial, or industrial spaces — our
                materials combine style, durability, and cost-effectiveness.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link to="/contact" className="btn-primary">
                  Start a Conversation
                </Link>
                <Link to="/catalogue" className="btn-link">
                  Browse Catalogue
                  <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Capabilities</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] max-w-2xl leading-[1.05]">
                What sets <span className="display-italic text-primary">Asios apart.</span>
              </h2>
            </div>
            <p className="text-[15px] text-sand-600 leading-[1.8] max-w-md">
              Four pillars define how we move material from our floor to yours — without surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 border-t border-l border-sand-200">
            {capabilities.map((c, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 md:p-10 lg:p-12 border-b border-r border-sand-200 bg-white hover:bg-cream transition-colors duration-500"
              >
                <div className="flex items-baseline gap-5 mb-4">
                  <span className="display text-2xl text-sand-400 tracking-wider">{c.index}</span>
                  <h3 className="display text-2xl md:text-[30px] leading-tight">{c.title}</h3>
                </div>
                <p className="text-[14.5px] text-sand-600 leading-[1.8] pl-12">{c.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Global footprint */}
      <GlobalFootprint />
    </main>
  );
};

export default Export;
