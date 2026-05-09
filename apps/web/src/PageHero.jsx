import React from "react";
import { motion } from "framer-motion";

const PageHero = ({ image, eyebrow, title, italicTitle, description, height = "tall" }) => {
  const heightClass =
    height === "short"
      ? "h-[50vh] min-h-[360px]"
      : height === "tall"
      ? "h-[70vh] min-h-[480px]"
      : "h-[60vh] min-h-[420px]";

  return (
    <section className={`relative w-full bg-ink overflow-hidden ${heightClass}`}>
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col justify-end pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="flex items-center gap-3 mb-5">
              <span className="rule rule-light !w-10" />
              <span className="eyebrow eyebrow-light !text-white">{eyebrow}</span>
            </div>
          )}
          <h1 className="display !text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5">
            {title}{" "}
            {italicTitle && (
              <span className="display-italic">{italicTitle}</span>
            )}
          </h1>
          {description && (
            <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.85] max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
