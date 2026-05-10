import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
    chapter: "Chapter 01",
    title: "Foundations of Excellence",
    desc: "Asios laid the cornerstone for a journey dedicated to tile craftsmanship — a vision built on precision and the redefinition of space.",
    keyword: "Founded",
  },
  {
    year: "2020",
    chapter: "Chapter 02",
    title: "Innovation Unleashed",
    desc: "We expanded our range to incorporate cutting-edge designs, materials, and technology — earning the trust of a growing clientele despite global headwinds.",
    keyword: "Expanded",
  },
  {
    year: "2021",
    chapter: "Chapter 03",
    title: "Design Diversity",
    desc: "A celebrated year of design diversity. We introduced styles and patterns to suit varied tastes, becoming a curated destination for discerning specifiers.",
    keyword: "Diversified",
  },
  {
    year: "2023",
    chapter: "Chapter 04",
    title: "Pinnacles of Success",
    desc: "Asios reached new heights — synonymous with top-tier surface solutions, enriching homes and commercial spaces across the globe.",
    keyword: "Recognised",
  },
  {
    year: "Today",
    chapter: "Chapter 05",
    title: "Onward, Outward",
    desc: "Fifty-plus markets, more than a thousand designs in active production, and a roadmap that grows with every partner who chooses us.",
    keyword: "Scaling",
  },
];

const stats = [
  { value: "8+", label: "Years of Craft", note: "Since the cornerstone in 2017" },
  { value: "50+", label: "Export Markets", note: "Across five continents" },
  { value: "1,200+", label: "Active Designs", note: "Curated across collections" },
  { value: "27,500+", label: "Tonnes Shipped", note: "Annual freight tonnage" },
];

const principles = [
  {
    index: "01",
    title: "We don't ship what we wouldn't lay in our own homes.",
    note: "Quality is the only currency that compounds over a long client relationship.",
  },
  {
    index: "02",
    title: "We answer every inquiry within one business day.",
    note: "Speed is the cheapest form of respect we can offer.",
  },
  {
    index: "03",
    title: "We document every container with photo evidence.",
    note: "Transparency removes ambiguity; ambiguity is where claims start.",
  },
  {
    index: "04",
    title: "We sign nothing until samples are approved.",
    note: "Surfaces are decided in the hand, never on the screen.",
  },
  {
    index: "05",
    title: "We treat partnership longer than transactions.",
    note: "If the third order isn't easier than the first, we've failed.",
  },
];

const heroFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutUS = () => {
  const milestonesRef = useRef(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const milestone = milestones[activeMilestone];

  const { scrollYProgress } = useScroll({
    target: milestonesRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 → 1) to active chapter index, evenly spaced.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const N = milestones.length;
    const idx = Math.min(N - 1, Math.max(0, Math.floor(value * N)));
    setActiveMilestone(idx);
  });

  // Click on a year → smooth-scroll to the middle of that chapter's scroll range.
  const scrollToMilestone = (idx) => {
    const section = milestonesRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableRange = section.offsetHeight - window.innerHeight;
    const target = sectionTop + ((idx + 0.5) / milestones.length) * scrollableRange;
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  };

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

      {/* Numbers in motion */}
      <section className="bg-white border-y border-sand-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-14 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-sand-200">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="px-4 md:px-8 py-4 first:pl-0 last:pr-0 text-center lg:text-left"
              >
                <div className="display text-5xl md:text-6xl lg:text-[72px] text-ink leading-none mb-3">
                  {s.value}
                </div>
                <div className="eyebrow !text-[10px]">{s.label}</div>
                <div className="mt-2 text-[12.5px] text-sand-500 leading-[1.6]">{s.note}</div>
              </motion.div>
            ))}
          </div>
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

      {/* Milestones — scroll-driven chapter navigator */}
      <section
        ref={milestonesRef}
        className="bg-ink text-white relative"
        style={{ minHeight: `${milestones.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* ambient red glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule rule-light !w-10" />
                  <span className="eyebrow eyebrow-light !text-white">Our Journey</span>
                </div>
                <h2 className="display !text-white text-3xl md:text-4xl lg:text-[48px] leading-[1.05]">
                  Milestones that <span className="display-italic text-primary">shaped us.</span>
                </h2>
              </div>
              <p className="text-[13px] text-white/55 leading-[1.85] max-w-md">
                Five chapters in our story so far. Scroll to read each one.
              </p>
            </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Year selector */}
            <div className="lg:col-span-4">
              <div className="flex lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
                {milestones.map((m, i) => {
                  const isActive = i === activeMilestone;
                  return (
                    <button
                      key={m.year}
                      type="button"
                      onClick={() => scrollToMilestone(i)}
                      className="group relative flex items-baseline gap-4 lg:gap-6 lg:py-4 py-3 px-4 lg:px-0 lg:border-l-2 lg:pl-6 transition-all duration-500 ease-editorial flex-shrink-0 lg:flex-shrink"
                      style={{
                        borderColor: isActive ? "#a42832" : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        className={`text-[10px] tracking-[0.22em] uppercase font-semibold transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-white/30 group-hover:text-white/55"
                        }`}
                      >
                        {m.chapter}
                      </span>
                      <span
                        className={`display block transition-all duration-500 ${
                          isActive
                            ? "!text-white text-3xl md:text-4xl"
                            : "!text-white/30 text-2xl group-hover:!text-white/60"
                        }`}
                      >
                        {m.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active milestone content */}
            <div className="lg:col-span-8 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rule rule-light !w-8" />
                    <span className="eyebrow eyebrow-light !text-white/80 !text-[10px]">
                      {milestone.keyword}
                    </span>
                  </div>
                  {/* huge year ghost */}
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 display text-8xl md:text-[140px] lg:text-[180px] text-white/5 leading-none pointer-events-none select-none">
                      {milestone.year}
                    </span>
                    <h3 className="relative display !text-white text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-6 pt-4">
                      {milestone.title}
                    </h3>
                    <p className="relative text-[15px] md:text-[16px] text-white/70 leading-[1.85] max-w-2xl">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-12 flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/55">
                  {String(activeMilestone + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-white/10 relative">
                  <span
                    className="absolute left-0 top-0 h-full bg-primary transition-all duration-700 ease-editorial"
                    style={{
                      width: `${((activeMilestone + 1) / milestones.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/35">
                  {String(milestones.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* The Asios Way — manifesto */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="rule !w-10" />
              <span className="eyebrow">The Asios Way</span>
              <span className="rule !w-10" />
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] max-w-3xl mx-auto">
              Five rules we <span className="display-italic text-primary">don't break.</span>
            </h2>
            <p className="mt-6 text-[15px] text-sand-600 leading-[1.85] max-w-2xl mx-auto">
              The internal language we keep coming back to — when a quote is hard to make,
              when a deadline is tight, when something goes wrong on the line.
            </p>
          </div>

          <div className="border-t border-sand-300">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-sand-300 group hover:bg-cream/60 transition-colors duration-500 px-2 md:px-4"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="display text-2xl md:text-3xl text-sand-300 group-hover:text-primary transition-colors">
                    {p.index}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="display text-2xl md:text-[32px] lg:text-[36px] leading-[1.15]">
                    {p.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-4 md:pl-4 flex items-end">
                  <p className="text-[13.5px] md:text-[14px] text-sand-500 italic leading-[1.7]">
                    {p.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="section bg-cream relative overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">A Note From</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05] mb-6">
                The <span className="display-italic text-primary">leadership.</span>
              </h2>
              <p className="text-[14px] text-sand-500 leading-[1.7] max-w-xs">
                Personal correspondence from the desk of the founding team — read in the spirit
                in which it was written.
              </p>
            </div>
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white p-8 md:p-12 lg:p-16 border border-sand-200 shadow-soft relative">
                {/* serif quote mark */}
                <span
                  className="absolute -top-6 -left-2 md:-left-4 display text-[140px] md:text-[180px] text-primary/15 leading-none pointer-events-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative">
                  <p className="display text-2xl md:text-3xl lg:text-[34px] leading-[1.4] mb-8 text-ink">
                    Ceramics is a slow craft. The clay needs time, the kiln needs patience, and
                    the buyer — the right buyer — needs the same honesty over and over.
                  </p>
                  <p className="text-[15px] text-sand-600 leading-[1.85] mb-5">
                    When we set up shop in Morbi, the calculation was simple: build a name a
                    family would want to inherit. Not the loudest in the catalogue, not the
                    cheapest in the quote. The most trustworthy. The one a designer specifies
                    twice without checking the brief.
                  </p>
                  <p className="text-[15px] text-sand-600 leading-[1.85] mb-10">
                    Eight years on, the work is the same. Show up early. Inspect twice. Answer
                    the email before the kettle boils. Ship what we'd lay in our own homes.
                    Repeat. We're grateful you're here — read the rest of the site, and write
                    to us when you're ready.
                  </p>

                  <div className="flex items-center gap-5 pt-6 border-t border-sand-200">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="display text-xl text-primary">A</span>
                    </div>
                    <div>
                      <div className="display text-xl">The Asios Team</div>
                      <div className="text-[12px] tracking-[0.22em] uppercase text-sand-500 mt-1">
                        Morbi · Gujarat · India
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
