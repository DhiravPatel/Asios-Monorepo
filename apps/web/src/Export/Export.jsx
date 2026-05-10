import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheck, FiPlus, FiMinus } from "react-icons/fi";
import exportHeader from "../assets/export-header.webp";
import exportPage from "../assets/export-page.webp";
import PageHero from "../PageHero";

const capabilities = [
  {
    index: "01",
    title: "Sourcing & Coordination",
    desc: "Direct manufacturer relationships across Morbi mean material parity, transparent costing, and accountability at every stage of production.",
  },
  {
    index: "02",
    title: "Quality Inspection",
    desc: "Pre-production, in-line, and pre-shipment checks. We catch deviations before they reach the container, not after the customs clearance.",
  },
  {
    index: "03",
    title: "Logistics & Documentation",
    desc: "Container loading supervision, customs paperwork, and shipping line coordination — handled by a desk that responds in your timezone.",
  },
  {
    index: "04",
    title: "After-Sale Support",
    desc: "From sample replacement to claims handling, we stay on the line until the project closes. Long-term partnerships, not transactional shipments.",
  },
];

const journey = [
  {
    index: "01",
    title: "Inquiry",
    desc: "Share specs — quantity, format, finish, destination port. We log and assign within four hours.",
  },
  {
    index: "02",
    title: "Quote",
    desc: "Indicative quote with estimated lead time and freight, delivered within one business day.",
  },
  {
    index: "03",
    title: "Sample",
    desc: "Physical samples couriered to your office for hands-on colour, finish, and dimensional validation.",
  },
  {
    index: "04",
    title: "Order",
    desc: "Pro-forma invoice signed, advance secured, production schedule locked into our floor calendar.",
  },
  {
    index: "05",
    title: "Production & QC",
    desc: "Pre-production, during-production, and pre-shipment inspections — with photographic evidence at each gate.",
  },
  {
    index: "06",
    title: "Documentation & Sail",
    desc: "Full export paperwork, container loading supervised in person, vessel booked. We track until your gate.",
  },
];

const markets = [
  {
    region: "Middle East",
    countries: "UAE · Saudi Arabia · Qatar · Oman · Kuwait · Bahrain",
    transit: "8 – 16 days",
    note: "Our largest export corridor by volume. Weekly sailings ex-Mundra.",
  },
  {
    region: "Africa",
    countries: "Kenya · Nigeria · Tanzania · Egypt · Morocco · Ghana",
    transit: "18 – 35 days",
    note: "Door-to-port specialists. We handle inland trucking via partner agents.",
  },
  {
    region: "Southeast Asia",
    countries: "Singapore · Vietnam · Malaysia · Indonesia · Philippines",
    transit: "7 – 15 days",
    note: "Short-haul precision. Container availability is rarely the constraint.",
  },
  {
    region: "Americas",
    countries: "USA · Canada · Mexico · Brazil · Chile",
    transit: "30 – 42 days",
    note: "FCL only. We optimise pallet plans for long-haul handling.",
  },
  {
    region: "Europe",
    countries: "UK · Germany · France · Spain · Russia · Poland",
    transit: "25 – 32 days",
    note: "CE-compliant documentation prepared in advance of every consignment.",
  },
];

const documents = [
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading (Original / Telex)",
  "Certificate of Origin",
  "FORM A / E-FORM (where applicable)",
  "COA / Test Report",
  "Insurance Certificate (CIF terms)",
  "Phytosanitary Certificate",
  "Fumigation Certificate",
];

const tradeTerms = [
  { code: "EXW", name: "Ex Works", note: "Pickup from our Morbi factory floor." },
  { code: "FOB", name: "Free On Board", note: "Loaded onboard at Mundra / Pipavav / JNPT." },
  { code: "CFR", name: "Cost & Freight", note: "Freight included to your port of discharge." },
  { code: "CIF", name: "Cost · Insurance · Freight", note: "Freight + cargo insurance to destination." },
  { code: "DAP", name: "Delivered At Place", note: "Door delivery via partner agent network." },
];

const faqs = [
  {
    q: "What is your minimum order quantity?",
    a: "One full 20ft container per SKU is our standard MOQ for export. For trial or sample orders, we can consolidate up to four SKUs per container. Quantities below that are best handled via our private-label partners.",
  },
  {
    q: "How long does production take?",
    a: "Standard formats ship in 25 – 35 days from PI confirmation. Custom finishes, branded packaging, or non-stock formats add 7 – 14 days. We lock the schedule the day your advance is received.",
  },
  {
    q: "Which Indian ports do you ship from?",
    a: "Primarily Mundra (Gujarat), Pipavav (Gujarat), and JNPT (Mumbai). Mundra is closest to our Morbi factory and our default for Middle East and Africa lanes. JNPT for transatlantic and European routes.",
  },
  {
    q: "What payment terms do you accept?",
    a: "TT with 30% advance and 70% against the scanned Bill of Lading. For established partners, irrevocable LC at sight is also acceptable. Open account is reviewed case-by-case after the third successful order.",
  },
  {
    q: "Can I customise packaging with my brand?",
    a: "Yes. We handle private label, custom box artwork, branded pallet wrap, and bespoke marking — see our Customization page for the full scope. Minimum quantities apply on artwork-specific runs.",
  },
  {
    q: "Do you supply samples before an order?",
    a: "Always. Hand-board samples and full-tile samples are available on most ranges. Sample courier costs are recoverable against your first commercial order. Initiate via the Sample Request page.",
  },
];

const Export = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? -1 : i);

  return (
    <main>
      <PageHero
        image={exportHeader}
        eyebrow="Global Reach"
        title="Crafted in Morbi,"
        italicTitle="shipped worldwide."
        description="Premium building materials delivered to fifty-plus markets with the precision your project deserves."
      />

      {/* Intro split */}
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
                  src={exportPage}
                  alt="Asios shipping operations"
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
                <span className="eyebrow">Premium Export</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] mb-7 leading-[1.05]">
                Building material, <br />
                <span className="display-italic text-primary">delivered globally.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-5">
                At Asios Global, we specialise in delivering high-quality building materials to every
                corner of the world. Our extensive product range — porcelain tiles, sanitary ware,
                wall and ceiling panels — caters to diverse needs across global markets.
              </p>
              <p className="text-[15px] md:text-[16px] text-sand-600 leading-[1.85] mb-10">
                A robust logistics network and global supply chain enable reliable export to
                international destinations. For residential, commercial, or industrial spaces — our
                materials combine style, durability, and cost-effectiveness.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link to="/contact" className="btn-primary">
                  Start a Conversation
                </Link>
                <Link
                  to="/catalogue"
                  className="btn-link hover:!text-primary transition-colors duration-300"
                >
                  Browse Catalogue
                  <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Capabilities</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] max-w-2xl leading-[1.05]">
                What sets <span className="display-italic text-primary">Asios apart.</span>
              </h2>
            </div>
            <p className="text-[15px] text-sand-600 leading-[1.8] max-w-md">
              Four pillars define how we move material from our floor to yours — without surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 border-t border-l border-sand-200">
            {capabilities.map((c, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 md:p-10 lg:p-12 border-b border-r border-sand-200 bg-white hover:bg-cream transition-colors duration-500"
              >
                <div className="flex items-baseline gap-5 mb-4">
                  <span className="display text-2xl text-sand-400 tracking-wider">{c.index}</span>
                  <h3 className="display text-2xl md:text-[30px] leading-tight">{c.title}</h3>
                </div>
                <p className="text-[14.5px] text-sand-600 leading-[1.8] pl-12">{c.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Export Journey */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="rule !w-10" />
              <span className="eyebrow">Export Journey</span>
              <span className="rule !w-10" />
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
              From inquiry to <span className="display-italic text-primary">delivery.</span>
            </h2>
            <p className="mt-6 text-[15px] text-sand-600 leading-[1.85] max-w-2xl mx-auto">
              How an order moves through Asios — six deliberate stages, each with a clear
              responsible owner and a documented hand-off.
            </p>
          </div>

          <div className="border-t border-sand-200">
            {journey.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-12 gap-4 md:gap-8 py-7 md:py-9 border-b border-sand-200 group hover:bg-cream/60 transition-colors duration-500 px-2 md:px-4"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="display text-2xl md:text-3xl text-sand-300 group-hover:text-primary transition-colors">
                    {step.index}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="display text-2xl md:text-[30px] leading-tight">{step.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-8 md:pl-4">
                  <p className="text-[14.5px] md:text-[15.5px] text-sand-600 leading-[1.85]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets We Serve */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Markets We Serve</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] max-w-2xl leading-[1.05]">
                Five corridors, <span className="display-italic text-primary">fifty-plus markets.</span>
              </h2>
            </div>
            <p className="text-[15px] text-sand-600 leading-[1.8] max-w-md">
              Every corridor has its own freight rhythm and documentation logic. We've shipped
              enough containers down each route to know where the time goes — and where to save it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-sand-200">
            {markets.map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white p-8 lg:p-10 border-b border-r border-sand-200 hover:bg-cream transition-colors duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="display text-2xl md:text-[28px] leading-tight">{m.region}</h3>
                  <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-sand-500 mt-2 shrink-0">
                    {m.transit}
                  </span>
                </div>
                <p className="text-[13px] text-sand-700 leading-[1.7] mb-4 capitalize-0">
                  {m.countries}
                </p>
                <p className="text-[13.5px] text-sand-500 italic leading-[1.7] mt-auto pt-4 border-t border-sand-200">
                  {m.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation & Trade terms */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Documents */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Documentation Handled</span>
              </div>
              <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-8">
                Paperwork that <span className="display-italic text-primary">moves first.</span>
              </h2>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-8 max-w-xl">
                Documents are prepared in parallel with production, not after. Drafts are shared
                for your review at least 72 hours before vessel cut-off — never at the last minute.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-sand-700">
                    <span className="w-5 h-5 inline-flex items-center justify-center bg-primary text-white shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3" />
                    </span>
                    <span className="leading-[1.6]">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Trade terms */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-cream p-8 md:p-10 lg:p-12 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule" />
                  <span className="eyebrow">Trade Terms</span>
                </div>
                <h3 className="display text-2xl md:text-[32px] leading-[1.1] mb-7">
                  Incoterms we <span className="display-italic text-primary">work under.</span>
                </h3>

                <div className="flex flex-col divide-y divide-sand-200">
                  {tradeTerms.map((t) => (
                    <div key={t.code} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-baseline gap-3">
                        <span className="display text-xl text-primary tracking-wider min-w-[44px]">
                          {t.code}
                        </span>
                        <span className="text-[13px] text-ink font-medium">{t.name}</span>
                      </div>
                      <p className="mt-1.5 text-[12.5px] text-sand-600 leading-[1.6] pl-[56px]">
                        {t.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section bg-ink text-white relative overflow-hidden">
        {/* decorative red corner accent */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="rule rule-light !w-10" />
                <span className="eyebrow eyebrow-light !text-white">Begin a Conversation</span>
              </div>
              <h2 className="display !text-white text-4xl md:text-5xl lg:text-[64px] leading-[1.05] mb-6">
                Send your <span className="display-italic text-primary">specifications.</span>
                <br />
                We'll handle the rest.
              </h2>
              <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.85] max-w-xl">
                One business day. That's our standard for quoting any inquiry — formats, finishes,
                quantities, destination port. No bottlenecks.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-10 flex flex-col gap-6 lg:items-end">
              <div className="flex flex-wrap items-center gap-6 lg:justify-end">
                <Link to="/contact" className="btn-primary btn-primary--invert">
                  Start an Inquiry
                </Link>
                <Link
                  to="/sample-request"
                  className="btn-link btn-link--light hover:!text-primary transition-colors duration-300"
                >
                  Request Samples
                  <FiArrowUpRight className="arrow w-4 h-4" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-white/45">
                <span className="rule rule-light !w-6" />
                <span>Replies in &lt; 24h · IST hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Buyer FAQ</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[48px] leading-[1.05] mb-6">
                The questions <br />
                <span className="display-italic text-primary">we hear most.</span>
              </h2>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-8 max-w-md">
                Honest answers to the inquiries that arrive before the first PO. Anything missing?
                Write to us — we'll add it here.
              </p>
              <Link
                to="/contact"
                className="btn-link hover:!text-primary transition-colors duration-300"
              >
                Ask a Different Question
                <FiArrowUpRight className="arrow w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-sand-300">
                {faqs.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border-b border-sand-300">
                      <button
                        type="button"
                        onClick={() => toggleFaq(i)}
                        aria-expanded={isOpen}
                        className="w-full text-left flex items-start justify-between gap-6 py-6 group"
                      >
                        <span className="display text-xl md:text-[24px] leading-tight pr-6 text-ink group-hover:text-primary transition-colors">
                          {item.q}
                        </span>
                        <span
                          className={`shrink-0 w-9 h-9 inline-flex items-center justify-center border transition-colors duration-300 mt-1 ${
                            isOpen
                              ? "bg-ink border-ink text-white"
                              : "border-sand-400 text-ink group-hover:bg-ink group-hover:border-ink group-hover:text-white"
                          }`}
                        >
                          {isOpen ? (
                            <FiMinus className="w-3.5 h-3.5" />
                          ) : (
                            <FiPlus className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-editorial overflow-hidden ${
                          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="text-[14.5px] text-sand-600 leading-[1.85] pr-12 max-w-2xl">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Export;
