import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import customization from "../assets/customization.png";
import customizationcover from "../assets/customizationcover.webp";
import PageHero from "../PageHero";

const services = [
  {
    index: "01",
    title: "Design Consultation",
    desc: "Our in-house team advises on schemes, layouts, and bespoke installations — helping you choose finishes that match the creative direction of the project.",
  },
  {
    index: "02",
    title: "Pattern & Format",
    desc: "Custom sizes, layouts, and pattern work for projects that demand a signature surface — beyond what's on the catalogue page.",
  },
  {
    index: "03",
    title: "Private Label",
    desc: "Ship our quality under your brand. Packaging, marking, and documentation prepared to your specification.",
  },
  {
    index: "04",
    title: "End-to-End Order Handling",
    desc: "From order placement and manufacturing oversight to inspection and direct shipment — to your warehouse or fulfilment centre.",
  },
];

const Customization = () => {
  return (
    <main>
      <PageHero
        image={customizationcover}
        eyebrow="Bespoke"
        title="Customised to"
        italicTitle="your specification."
        description="From design tweaks to full private-label production — Asios partners with brands and specifiers who need more than off-the-shelf."
      />

      {/* Intro */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Customised Products</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
                Inspiration is <span className="display-italic text-primary">everywhere.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
                Asios offers advice and ideas for decorating every part of your home — indoors and
                outdoors. Our design and development team is driven by curiosity, and our
                catalogues exist to help you find the floor or wall covering best suited to your
                taste, with the latest design direction firmly in mind.
              </p>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85]">
                With considerable expertise, we transform what captures our imagination into truly
                unique tiles and ceramic products. Our in-house design team offers expert advice on
                schemes, layouts, and bespoke installations — so the right product can always meet
                your creative vision.
              </p>
              <p className="mt-6 text-[12.5px] text-sand-500 leading-[1.7] italic">
                Designs created in-house remain Asios &amp; brand-partner copyright. Designs
                supplied by clients retain client copyright; the tile design elements developed in
                production are exclusive to that order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule" />
            <span className="eyebrow">What We Customise</span>
          </div>
          <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-12 max-w-3xl">
            Four ways we tailor <span className="display-italic text-primary">to your brief.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-0 border-t border-l border-sand-200">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 md:p-10 lg:p-12 bg-white border-b border-r border-sand-200 hover:bg-cream transition-colors duration-500"
              >
                <div className="flex items-baseline gap-5 mb-4">
                  <span className="display text-2xl text-sand-400 tracking-wider">{s.index}</span>
                  <h3 className="display text-2xl md:text-[28px] leading-tight">{s.title}</h3>
                </div>
                <p className="text-[14.5px] text-sand-600 leading-[1.8] pl-12">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Private label CTA */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={customization}
                alt="Private label production"
                className="w-full h-[360px] md:h-[460px] object-contain"
              />
            </motion.div>
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Private Label</span>
              </div>
              <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-6">
                Your brand on our <span className="display-italic text-primary">quality.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
                Not sure where to start? Visit our design collection online — or arrange an
                in-depth visit to our corporate office in India. As a leading tiles exporter, we
                advise and inspire professionals and consumers on current interior trends and
                latest products from Asios and our brand partners across the globe.
              </p>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-10">
                Want a professional team to handle the entire process — placing the order, manufacturing
                oversight, inspection, and direct shipping from India, Italy, Spain, or China to
                your doorstep or fulfilment centre? Get in touch and we'll walk through the
                details.
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <Link to="/contact" className="btn-primary">
                  Discuss a Project
                </Link>
                <Link to="/sample-request" className="btn-link">
                  Request Samples
                  <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Customization;
