import React from "react";
import { motion } from "framer-motion";
import iso from "../assets/ISO.png";
import REX from "../assets/REX.png";
import fieo from "../assets/fieo.png";
import cc from "../assets/cc.png";

const certifications = [
  {
    img: iso,
    code: "ISO",
    title: "ISO 9001:2015",
    description:
      "Certified under the ISO 9001:2015 quality management system — meeting the highest standards of quality management.",
  },
  {
    img: REX,
    code: "REX",
    title: "Registered Exporter",
    description:
      "We simplify trade procedures and ensure our products benefit from preferential tariff treatment in partner countries.",
  },
  {
    img: fieo,
    code: "FIEO",
    title: "Federation Membership",
    description:
      "A symbol of our dedication to promoting Indian exports on a global scale.",
  },
  {
    img: cc,
    code: "CE",
    title: "European Conformity",
    description:
      "Our products carry the CE mark, indicating compliance with European Union directives and regulations.",
  },
];

const Cerification = () => {
  return (
    <section className="section bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="rule !w-10" />
            <span className="eyebrow">Credentials</span>
            <span className="rule !w-10" />
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
            Certified at every <span className="display-italic text-primary">standard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-sand-200">
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 lg:p-10 border-b border-r border-sand-200 hover:bg-cream transition-colors duration-500 ease-editorial flex flex-col"
            >
              <span className="absolute top-6 right-6 eyebrow !text-[10px] text-sand-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="h-20 flex items-start mb-7">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="display text-2xl md:text-[26px] leading-tight mb-3">
                {c.title}
              </h3>
              <p className="text-[14px] text-sand-600 leading-[1.75]">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cerification;
