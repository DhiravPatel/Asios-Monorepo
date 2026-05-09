import React from "react";
import { motion } from "framer-motion";
import { FiDownload, FiEye } from "react-icons/fi";
import productInspection from "../assets/duproductionInspection.jpg";
import sampleMatching from "../assets/sampleMatching.jpg";
import preShipment from "../assets/preShipment.jpg";
import sampleReport from "../assets/SampleReportIMG.jpg";
import QcCover from "../assets/qc.webp";
import loading from "../assets/loading.png";
import PageHero from "../PageHero";

const stages = [
  {
    image: sampleMatching,
    eyebrow: "Stage 01",
    title: "Pre-Production Inspection",
    body:
      "It's a matter of trust. Asios inspects raw materials and components before final production begins, against the specifications you provided. After samples are confirmed, we verify the factory has ordered the correct materials, components, and accessories — and randomly inspect partially produced batches for technical, dimensional, and surface-quality defects.",
    bullets: [
      "Technical standards & physical properties",
      "Surface flatness, thickness, and edge straightness",
      "Water absorption & breaking strength",
      "Stain, thermal, and abrasion resistance",
      "Packaging and pallet specifications",
    ],
  },
  {
    image: productInspection,
    eyebrow: "Stage 02",
    title: "During-Production Inspection",
    body:
      "Ideal for shipments of substantial quantities, continuous production lines, and projects with strict on-time requirements. Carried out at 12–15% completion, we inspect the production batch, identify deviations, advise on corrective measures, and re-check defects flagged earlier — confirming they have been rectified before scale-up.",
  },
  {
    image: preShipment,
    eyebrow: "Stage 03",
    title: "Pre-Shipment Inspection",
    body:
      "Final random inspection begins only after production is complete and packed. Through statistical sampling set by industry standards, we verify product safety, quantity, workmanship, function, colour, size, and packing — confirming consistency and compliance with all country, industry, or contractual requirements.",
  },
  {
    image: loading,
    eyebrow: "Stage 04",
    title: "Loading Supervision",
    body:
      "An Asios representative monitors the loading process, verifies product quantity, and ensures correct handling of cargo and quality. Upon completion, containers are sealed with Asios tape as proof of compliance — significantly reducing the risk of importing cargo.",
  },
];

const QualityAssurance = () => {
  const handleDownload = (driveLink) => {
    const fileIdMatch = driveLink.match(/[-\w]{25,}/);
    if (!fileIdMatch) return;
    const fileId = fileIdMatch[0];
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleLink =
    "https://drive.google.com/file/d/1si5KQ6FUDnDFRc6T349qVGRt34g8W5yI/view?usp=drive_link";

  return (
    <main>
      <PageHero
        image={QcCover}
        eyebrow="Quality Assurance"
        title="Inspected at every"
        italicTitle="stage."
        description="Four checkpoints — from raw material to sealed container — to make sure what arrives is what we promised."
      />

      {/* Intro */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Our Approach</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[52px] leading-[1.05]">
                A standard <span className="display-italic text-primary">we own.</span>
              </h2>
            </div>
            <p className="lg:col-span-7 lg:pl-10 text-[15px] md:text-[16px] text-sand-600 leading-[1.85]">
              Most issues with imported tiles are caught too late — at the warehouse, on the
              installation floor, or worse. We catch them earlier. Our four-stage inspection
              process places trained eyes at every transition where defects compound, so the
              container that ships is the container you signed off.
            </p>
          </div>
        </div>
      </section>

      {/* Stages alternating */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-20 md:py-28 flex flex-col gap-20 md:gap-28">
          {stages.map((stage, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="relative">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-[360px] lg:h-[480px] object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rule" />
                    <span className="eyebrow">{stage.eyebrow}</span>
                  </div>
                  <h3 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-6">
                    {stage.title}
                  </h3>
                  <p className="text-[15px] text-sand-600 leading-[1.85] mb-6">{stage.body}</p>
                  {stage.bullets && (
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-2">
                      {stage.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[13.5px] text-sand-700"
                        >
                          <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Sample report */}
      <section className="section bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Reference Document</span>
              </div>
              <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-6">
                A sample of our <span className="display-italic text-primary">QC report.</span>
              </h2>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-8">
                Every shipment ships with documentation. Download a sample to see the level of
                detail you can expect — measurement records, defect classification, and
                photographic evidence.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDownload(sampleLink)}
                  className="btn-primary"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  Download Sample
                </button>
                <button
                  type="button"
                  onClick={() => window.open(sampleLink, "_blank")}
                  className="btn-link"
                >
                  Preview <FiEye className="w-4 h-4" />
                </button>
              </div>
            </div>
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-cream border border-sand-200 p-6 md:p-10 shadow-soft">
                <img
                  src={sampleReport}
                  alt="Sample quality report"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QualityAssurance;
