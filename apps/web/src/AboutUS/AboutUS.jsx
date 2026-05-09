import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import aboutus from "../assets/about.webp";
import aboutimg from "../assets/about/about_img.webp";
import GlobalFootprint from "./GlobalFootprint";
import Cerification from "./Cerification";
import GridImages from "./GridImages";

const commitments = [
  {
    index: "01",
    title: "Vision",
    desc: "To become the most trusted supplier of ceramic products globally — building lasting relationships with clients and expanding our reach as a single, deliberate team.",
  },
  {
    index: "02",
    title: "Mission",
    desc: "To deliver the finest quality ceramics at competitive prices, paired with service that earns referral and repeat business as a matter of course.",
  },
  {
    index: "03",
    title: "Values",
    desc: "Excellence in every detail, integrity in every dealing. We hold ourselves to the highest standards, and we are answerable to them — always.",
  },
  {
    index: "04",
    title: "Philosophy",
    desc: "Quietly exceed expectation. Each tile, each shipment, each conversation should leave the client with a sense of having been understood.",
  },
];

const milestones = [
  {
    year: "2017",
    title: "Foundations of Excellence",
    desc: "Asios laid the cornerstone for a journey dedicated to tile craftsmanship — a vision built on precision and the redefinition of space.",
  },
  {
    year: "2020",
    title: "Innovation Unleashed",
    desc: "We expanded our range to incorporate cutting-edge designs, materials, and technology — earning the trust of a growing clientele despite global headwinds.",
  },
  {
    year: "2021",
    title: "Design Diversity",
    desc: "A celebrated year of design diversity. We introduced styles and patterns to suit varied tastes, becoming a curated destination for discerning specifiers.",
  },
  {
    year: "2023",
    title: "Pinnacles of Success",
    desc: "Asios reached new heights — synonymous with top-tier surface solutions, enriching homes and commercial spaces across the globe.",
  },
];

const heroFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutUS = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full bg-ink overflow-hidden">
        <motion.img
          src={aboutus}
          alt="Asios manufacturing"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/70" />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col justify-end pb-16 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFade}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="rule rule-light !w-10" />
              <span className="eyebrow eyebrow-light !text-white">Who We Are</span>
            </div>
            <h1 className="display !text-white text-5xl md:text-6xl lg:text-7xl mb-5">
              A legacy of <span className="display-italic">craft.</span>
            </h1>
            <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.85] max-w-2xl">
              From Morbi — the ceramic capital of India — Asios Global has built a reputation
              for delivering surfaces that endure. This is our story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legacy split */}
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
                  src={aboutimg}
                  alt="Asios product detail"
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
                <span className="eyebrow">The Company</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] mb-7 leading-[1.05]">
                A legacy in the <span className="display-italic text-primary">export industry.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
                Based in Morbi City since 2021, Asios Global has rapidly established itself as a
                leading export company in the building material industry. Specialising in porcelain
                tiles, bath ware, and decorative panels, we have built a reputation for delivering
                high-quality goods to clients worldwide.
              </p>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-10">
                Our extensive product range pairs innovative designs with durable materials —
                meeting the demands of modern architecture and considered interior design across
                residential and commercial markets.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link to="/product" className="btn-primary">
                  Explore Products
                </Link>
                <Link to="/catalogue" className="btn-link">
                  View E-Catalogue
                  <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Pull-quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 lg:mt-28 max-w-4xl mx-auto text-center"
          >
            <span className="rule mx-auto mb-6" />
            <p className="display text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
              Elevate every detail. Discover the exquisite{" "}
              <span className="display-italic text-primary">stone, tiles, and bathware</span>{" "}
              collection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitments + image grid */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="rule" />
                <span className="eyebrow">Our Commitment</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05] mb-10">
                Built on <span className="display-italic text-primary">excellence.</span>
              </h2>

              <div className="flex flex-col gap-8">
                {commitments.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-sand-200 pb-7"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="display text-xl text-sand-400 tracking-wider shrink-0">
                        {c.index}
                      </span>
                      <div>
                        <h3 className="display text-2xl md:text-[28px] mb-2">{c.title}</h3>
                        <p className="text-[14.5px] text-sand-600 leading-[1.8]">{c.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-6">
              <GridImages />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="section bg-ink text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="rule rule-light !w-10" />
              <span className="eyebrow eyebrow-light !text-white">Our Journey</span>
              <span className="rule rule-light !w-10" />
            </div>
            <h2 className="display !text-white text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
              Milestones that <span className="display-italic text-primary">shaped us.</span>
            </h2>
          </div>

          <div className="relative">
            {/* desktop spine */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/15" />

            <div className="flex flex-col gap-10 lg:gap-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 relative ${
                    i % 2 === 1 ? "lg:[&>div:first-child]:col-start-2" : ""
                  }`}
                >
                  <div className={`${i % 2 === 1 ? "lg:text-left" : "lg:text-right"}`}>
                    <div
                      className={`inline-flex flex-col ${
                        i % 2 === 1 ? "lg:items-start" : "lg:items-end"
                      } items-start max-w-md`}
                    >
                      <span className="display text-5xl md:text-6xl text-primary mb-3">
                        {m.year}
                      </span>
                      <h3 className="display !text-white text-2xl md:text-[28px] mb-3 leading-tight">
                        {m.title}
                      </h3>
                      <p className="text-[14px] text-white/65 leading-[1.8]">{m.desc}</p>
                    </div>
                  </div>
                  {/* spine dot */}
                  <span className="hidden lg:block absolute left-1/2 top-3 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <Cerification />

      {/* Global footprint */}
      <GlobalFootprint />
    </main>
  );
};

export default AboutUS;
