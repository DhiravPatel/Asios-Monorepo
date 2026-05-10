import React from "react";
import { motion } from "framer-motion";
import img from "../assets/countries.webp";

const GlobalFootprint = () => {
  return (
    <section className="section bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="rule !w-10" />
            <span className="eyebrow">Global Reach</span>
            <span className="rule !w-10" />
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
            Where Asios <span className="display-italic text-primary">arrives.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-6 md:p-10 lg:p-14 border border-sand-200 shadow-soft"
        >
          <img src={img} alt="Asios global footprint" className="w-full h-auto" />
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: "50+", label: "Export Markets" },
            { value: "5", label: "Continents" },
            { value: "1,200+", label: "Designs Shipped" },
            { value: "8+", label: "Years of Craft" },
          ].map((s, i) => (
            <div key={i} className="text-center px-2 py-6 border-l border-sand-200 first:border-l-0 md:first:border-l-0">
              <div className="display text-3xl md:text-4xl text-ink">{s.value}</div>
              <div className="eyebrow mt-2 !text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalFootprint;
