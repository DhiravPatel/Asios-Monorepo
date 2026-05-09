import React, { useState } from "react";
import { motion } from "framer-motion";
import tileCalc from "../assets/tile-calc.webp";
import PageHero from "../PageHero";

const tileSizes = [
  "300x600",
  "600x600",
  "600x1200",
  "800x800",
  "800x1600",
  "1200x1200",
  "1200x1800",
];

const tileData = {
  "300x600": { pcsPerBox: 8, sqm: 1.44, sqFt: 15.49 },
  "600x600": { pcsPerBox: 4, sqm: 1.44, sqFt: 15.49 },
  "600x1200": { pcsPerBox: 2, sqm: 1.44, sqFt: 15.49 },
  "800x800": { pcsPerBox: 3, sqm: 1.92, sqFt: 20.66 },
  "800x1600": { pcsPerBox: 2, sqm: 2.56, sqFt: 27.55 },
  "1200x1200": { pcsPerBox: 2, sqm: 2.88, sqFt: 30.99 },
  "1200x1800": { pcsPerBox: 2, sqm: 4.32, sqFt: 46.48 },
};

const TilesCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!l || !w || !size) return;
    const areaInFeet = l * w;
    const areaInMeters = areaInFeet / 10.76;
    const tile = tileData[size];
    const boxesRequired = Math.ceil(areaInFeet / tile.sqFt);
    const tilesRequired = boxesRequired * tile.pcsPerBox;
    setResult({
      sqm: Math.ceil(areaInMeters),
      sqFt: Math.ceil(areaInFeet),
      boxes: boxesRequired,
      tiles: tilesRequired,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setSize("");
    setResult(null);
  };

  return (
    <main>
      <PageHero
        image={tileCalc}
        eyebrow="Plan Ahead"
        title="Tiles"
        italicTitle="calculator."
        description="Estimate the surface area, tiles, and boxes required for your project — accurate to the nearest box."
        height="medium"
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Inputs */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white border border-sand-200 p-8 md:p-10 lg:p-12 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule" />
                  <span className="eyebrow">Project Details</span>
                </div>
                <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-8">
                  Enter your <span className="display-italic text-primary">measurements.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="eyebrow !text-[10px]">Length (Feet)</span>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 12"
                      className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow !text-[10px]">Width (Feet)</span>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 10"
                      className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="eyebrow !text-[10px]">Tile Size (mm)</span>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select tile format…</option>
                      {tileSizes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={calculate}
                    disabled={!length || !width || !size}
                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Calculate
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[12px] tracking-[0.22em] uppercase font-semibold text-sand-600 hover:text-ink transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-ink text-white p-8 md:p-10 lg:p-12 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule rule-light !w-10" />
                  <span className="eyebrow eyebrow-light !text-white">Estimate</span>
                </div>
                <h2 className="display !text-white text-3xl md:text-4xl leading-[1.1] mb-10">
                  Your <span className="display-italic text-primary">requirement.</span>
                </h2>

                {!result ? (
                  <div className="flex-1 flex items-center">
                    <p className="text-[14px] text-white/55 leading-[1.85]">
                      Fill in the dimensions and tile size to see your estimated coverage,
                      total tiles, and boxes required.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-white/10 flex-1">
                    <ResultRow label="Total Area (Sq. Ft.)" value={result.sqFt} />
                    <ResultRow label="Total Area (Sq. M.)" value={result.sqm} />
                    <ResultRow label="Tiles Required" value={result.tiles} />
                    <ResultRow label="Boxes Required" value={result.boxes} accent />
                  </div>
                )}

                <p className="mt-8 pt-6 border-t border-white/10 text-[12px] text-white/45 leading-[1.7]">
                  This is an approximate estimate. Actual requirement may vary based on cuts,
                  wastage, and pattern. We recommend ordering 5–10% extra.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ResultRow = ({ label, value, accent }) => (
  <div className="py-4 flex items-center justify-between">
    <span className="text-[12px] tracking-[0.18em] uppercase text-white/55">{label}</span>
    <span className={`display text-3xl md:text-4xl ${accent ? "text-primary" : "text-white"}`}>
      {value}
    </span>
  </div>
);

export default TilesCalculator;
