import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import image from "../../assets/about.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="section bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -bottom-5 -left-5 w-36 h-36 md:w-48 md:h-48 bg-primary/95 hidden md:block" />
              <img
                src={image}
                alt="Asios manufacturing"
                className="relative w-full h-[420px] lg:h-[560px] object-cover"
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Our Story</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[56px] mb-6">
              Quality, made <span className="display-italic text-primary">ordinary.</span>
            </h2>
            <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.8] mb-5">
              Asios is the name synonymous with qualitative products at the most competitive prices.
              Our customer-centric approach made us the market leader in the building material industry.
            </p>
            <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.8] mb-10">
              Clients are our most valuable asset. We believe in providing the best to our clients —
              the manufacturer where every need is catered under one umbrella. Creating a good
              living environment for you, at the best prices, is our duty.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link to="/about" className="btn-primary">
                About Asios
              </Link>
              <Link to="/export" className="btn-link">
                View Export Reach
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-6 lg:gap-10 mt-12 pt-10 border-t border-sand-200">
              <div>
                <div className="display text-3xl md:text-4xl text-ink">8+</div>
                <div className="eyebrow mt-1.5 !text-[10px]">Years of Craft</div>
              </div>
              <div>
                <div className="display text-3xl md:text-4xl text-ink">50+</div>
                <div className="eyebrow mt-1.5 !text-[10px]">Export Markets</div>
              </div>
              <div>
                <div className="display text-3xl md:text-4xl text-ink">1,200+</div>
                <div className="eyebrow mt-1.5 !text-[10px]">Designs Shipped</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
