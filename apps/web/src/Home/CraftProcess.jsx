import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const steps = [
  {
    index: "01",
    label: "Sourced",
    title: "Clay & minerals.",
    desc: "Carefully selected raw materials from the rich mineral belts of Gujarat — graded, batched, and tested before they ever reach the line.",
  },
  {
    index: "02",
    label: "Pressed",
    title: "Form & body.",
    desc: "High-pressure forming under Italian-grade hydraulic presses gives our tile bodies the density and dimensional precision specifiers expect.",
  },
  {
    index: "03",
    label: "Glazed",
    title: "Surface & art.",
    desc: "Digital printing meets traditional glaze chemistry. Every finish — matte, polished, structured — is calibrated against a master sample.",
  },
  {
    index: "04",
    label: "Fired & inspected",
    title: "Kiln to crate.",
    desc: "Tunnel kilns at 1,200°C, then a four-stage QC pass. Only what passes the master inspector reaches a container.",
  },
];

const CraftProcess = () => {
  return (
    <section className="section bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="rule" />
              <span className="eyebrow">The Craft</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[56px] max-w-2xl leading-[1.05]">
              From clay to <span className="display-italic text-primary">container.</span>
            </h2>
          </div>
          <p className="text-[15px] text-sand-600 leading-[1.85] max-w-md">
            Four stages, one standard. The work happens on the same floor every day —
            and we'd rather show you than tell you.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-0 border-t border-l border-sand-200">
          {steps.map((s, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white p-8 md:p-10 border-b border-r border-sand-200 hover:bg-cream transition-colors duration-500 flex flex-col min-h-[280px] md:min-h-[340px]"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="display text-2xl text-sand-300 group-hover:text-primary transition-colors duration-500">
                  {s.index}
                </span>
                <span className="eyebrow !text-[10px] text-sand-500">{s.label}</span>
              </div>

              <h3 className="display text-2xl md:text-[28px] leading-tight mb-4">
                {s.title}
              </h3>
              <p className="text-[14px] text-sand-600 leading-[1.8] flex-1">{s.desc}</p>

              <div className="mt-6 w-8 h-px bg-sand-300 group-hover:bg-primary group-hover:w-12 transition-all duration-500 ease-editorial" />
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/quality-assurance" className="btn-link mx-auto">
            See the Quality Process
            <FiArrowUpRight className="arrow w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CraftProcess;
