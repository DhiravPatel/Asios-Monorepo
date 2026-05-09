import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import exportImg from "../assets/export.webp";

const ExportSection = () => {
  return (
    <section className="section bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: image with floating stat */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={exportImg}
              alt="Global shipping containers"
              className="w-full h-[420px] lg:h-[600px] object-cover"
            />
            {/* Stat card overlapping bottom-right */}
            <div className="hidden md:flex absolute -bottom-8 -right-4 lg:right-8 bg-white shadow-lift border border-sand-200 px-8 py-7 flex-col items-start min-w-[200px]">
              <span className="display text-5xl lg:text-6xl text-ink leading-none">50+</span>
              <span className="eyebrow mt-3 !text-[10px]">Export Markets</span>
              <span className="text-[12px] text-sand-500 mt-1">Across 5 continents</span>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            className="lg:col-span-6 lg:pl-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Global Reach</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[56px] mb-6 leading-[1.05]">
              Crafted in Morbi, <br />
              <span className="display-italic text-primary">shipped worldwide.</span>
            </h2>
            <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
              At Asios Global, we deliver high-quality building materials to every corner of the world.
              Our extensive product range — porcelain tiles, sanitary ware, wall &amp; ceiling panels —
              caters to diverse needs across global markets.
            </p>
            <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-10">
              A robust logistics network and global supply chain enable reliable export to international
              destinations. For residential, commercial, or industrial spaces — our materials combine
              style, durability, and cost-effectiveness.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link to="/export" className="btn-primary">
                Explore Export
              </Link>
              <Link to="/catalogue" className="btn-link">
                Download E-Catalogue
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
