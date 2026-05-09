import React from "react";
import { motion } from "framer-motion";
import best_price from "../assets/WhyChoose Us/best-price.png";
import customer from "../assets/WhyChoose Us/customer.png";
import design from "../assets/WhyChoose Us/design.png";
import fastdelivery from "../assets/WhyChoose Us/fast-delivery.png";
import italiantech from "../assets/WhyChoose Us/italian_tech.png";
import primimumquality from "../assets/WhyChoose Us/premium_quality.png";

const items = [
  { icon: italiantech, title: "Italian Technology", description: "Cutting-edge Italian machinery underpins every line we run, holding finish and tolerance to a single standard." },
  { icon: primimumquality, title: "Premium Quality", description: "Materials sourced and graded with deliberation. We ship only what we'd lay in our own homes." },
  { icon: design, title: "Considered Design", description: "Modern, restrained, and tailored — our designs read as confidently quiet rather than fashionable." },
  { icon: best_price, title: "Honest Pricing", description: "Direct-from-manufacturer pricing means competitive cost without trade-offs on craft." },
  { icon: fastdelivery, title: "Timely Delivery", description: "Logistics tuned for export — your shipments leave when planned, arrive when promised." },
  { icon: customer, title: "Customer Care", description: "Long-term relationships, not transactions. We're here before, during, and after the order." },
];

const WhyChooseUs = () => {
  return (
    <section className="section bg-ink text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="rule" />
              <span className="eyebrow eyebrow-light !text-white">Why Asios</span>
            </div>
            <h2 className="display !text-white text-4xl md:text-5xl lg:text-[56px] leading-[1.05]">
              The standard <br />
              <span className="display-italic text-primary">we hold ourselves to.</span>
            </h2>
          </div>
          <p className="lg:col-span-7 lg:pl-10 text-[15px] md:text-[16px] text-white/70 leading-[1.85] lg:self-end">
            Six commitments shape every product, every shipment, and every conversation.
            They are the reason our partners stay.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 border-t border-l border-white/10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 md:p-10 border-b border-r border-white/10 hover:bg-white/[0.03] transition-colors duration-500"
            >
              <span className="absolute top-6 right-6 display text-sm text-white/30 font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 object-contain mb-6 brightness-0 invert opacity-90"
              />
              <h3 className="display !text-white text-2xl md:text-[28px] mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-[14px] text-white/65 leading-[1.75]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
