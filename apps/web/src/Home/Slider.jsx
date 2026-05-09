import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import b1 from "../assets/Tiles1.webp";
import b2 from "../assets/sanitry.webp";
import b3 from "../assets/Tiles2.webp";
import b4 from "../assets/pvc1.webp";
import b5 from "../assets/celing-panel.webp";

const slides = [
  {
    src: b3,
    eyebrow: "Collection 01",
    title: "Porcelain Tiles",
    description:
      "Engineered for strength and water resistance, our porcelain finishes endure where elegance and durability must meet.",
    cta: "/product",
  },
  {
    src: b2,
    eyebrow: "Collection 02",
    title: "Sanitaryware",
    description:
      "Bathroom essentials shaped with quiet precision — fixtures that pair function with the warmth of considered design.",
    cta: "/product",
  },
  {
    src: b1,
    eyebrow: "Collection 03",
    title: "Vitrified Tiles",
    description:
      "Stain-resistant, low-maintenance, and quietly luminous. Built for spaces that move from morning light to evening calm.",
    cta: "/product",
  },
  {
    src: b4,
    eyebrow: "Collection 04",
    title: "Polymer Wall Panels",
    description:
      "Lightweight, moisture-resistant, and refined. Wall surfaces that transform interiors with minimal installation footprint.",
    cta: "/product",
  },
  {
    src: b5,
    eyebrow: "Collection 05",
    title: "Ceiling Panels",
    description:
      "Architectural ceilings finished to last. Acoustic comfort and durability dressed in textures that read as still and intentional.",
    cta: "/product",
  },
];

const formatIndex = (n) => String(n + 1).padStart(2, "0");

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-ink overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <motion.img
                key={i + "-img"}
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex items-end pointer-events-none">
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 lg:px-12 pb-20 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl pointer-events-auto"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule rule-light !w-10" />
                <span className="eyebrow eyebrow-light !text-white">{slides[activeIndex].eyebrow}</span>
              </div>
              <h1 className="display !text-white text-5xl md:text-6xl lg:text-7xl mb-5">
                {slides[activeIndex].title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-white/85 leading-relaxed max-w-xl mb-8">
                {slides[activeIndex].description}
              </p>
              <Link to={slides[activeIndex].cta} className="btn-link btn-link--light">
                Explore Collection
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide counter (bottom-right) */}
      <div className="absolute right-6 md:right-10 lg:right-12 bottom-20 md:bottom-28 hidden sm:flex flex-col items-end gap-3 pointer-events-none">
        <div className="flex items-center gap-2 text-white/85 font-mono text-[12px] tracking-[0.18em]">
          <span className="text-white">{formatIndex(activeIndex)}</span>
          <span className="w-12 h-px bg-white/30 relative">
            <span
              className="absolute left-0 top-0 h-full bg-white transition-all duration-700 ease-editorial"
              style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
          </span>
          <span className="text-white/60">{formatIndex(slides.length - 1)}</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
