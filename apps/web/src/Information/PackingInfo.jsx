import React, { useMemo } from "react";
import { motion } from "framer-motion";
import packingImg from "../assets/packing.webp";
import PageHero from "../PageHero";

const rows = [
  { product: "Porcelain Tiles", size: "30x60", thickness: "8.50", weight: "26.5", pcs: "8", sqm: "1.44", boxPallet: "40", palletCont: "26", boxCont: "1040", sqmCont: "1497.60", weightCont: "27910.00", container: "20ft" },
  { product: "Porcelain Tiles", size: "60x60", thickness: "8.00", weight: "25.0", pcs: "4", sqm: "1.44", boxPallet: "40", palletCont: "27", boxCont: "1080", sqmCont: "1555.20", weightCont: "27350.00", container: "20ft" },
  { product: "Porcelain Tiles", size: "60x120", thickness: "8.00", weight: "26.0", pcs: "2", sqm: "1.44", boxPallet: "60 & 30", palletCont: "12 & 11", boxCont: "1050", sqmCont: "1512.00", weightCont: "27650.00", container: "20ft" },
  { product: "Porcelain Tiles", size: "80x80", thickness: "8.50", weight: "36.5", pcs: "3", sqm: "1.92", boxPallet: "36", palletCont: "21", boxCont: "756", sqmCont: "1451.52", weightCont: "27944.00", container: "20ft" },
  { product: "Porcelain Slab Tiles", size: "80x160", thickness: "9.00", weight: "52.0", pcs: "2", sqm: "2.56", boxPallet: "28", palletCont: "19", boxCont: "532", sqmCont: "1361.92", weightCont: "27964.00", container: "20ft" },
  { product: "Ceramic Wall Tiles", size: "20x30", thickness: "6.00", weight: "9.0", pcs: "16", sqm: "0.96", boxPallet: "120", palletCont: "24", boxCont: "2880", sqmCont: "2764.80", weightCont: "26270.00", container: "20ft" },
  { product: "Ceramic Wall Tiles", size: "25x37.5", thickness: "7.00", weight: "8.3", pcs: "8", sqm: "0.75", boxPallet: "128", palletCont: "24", boxCont: "3072", sqmCont: "2304.00", weightCont: "25897.60", container: "20ft" },
  { product: "Ceramic Wall Tiles", size: "30x30", thickness: "8.00", weight: "9.0", pcs: "8", sqm: "0.72", boxPallet: "128", palletCont: "24", boxCont: "3072", sqmCont: "2211.84", weightCont: "27978.00", container: "20ft" },
  { product: "Ceramic Wall Tiles", size: "30x45", thickness: "8.00", weight: "10.5", pcs: "6", sqm: "0.81", boxPallet: "96", palletCont: "24", boxCont: "2304", sqmCont: "1866.24", weightCont: "24542.00", container: "20ft" },
  { product: "Ceramic Wall Tiles", size: "30x60", thickness: "8.00", weight: "13.5", pcs: "5", sqm: "0.90", boxPallet: "96", palletCont: "21", boxCont: "2016", sqmCont: "1814.40", weightCont: "27566.00", container: "20ft" },
  { product: "Ceramic Floor Tiles", size: "30x30", thickness: "7.00", weight: "13.0", pcs: "11", sqm: "0.99", boxPallet: "108", palletCont: "19", boxCont: "2052", sqmCont: "2031.48", weightCont: "27026.00", container: "20ft" },
  { product: "Ceramic Floor Tiles", size: "40x40", thickness: "8.00", weight: "15.0", pcs: "6", sqm: "0.96", boxPallet: "84", palletCont: "22", boxCont: "1848", sqmCont: "1774.08", weightCont: "27970.00", container: "20ft" },
];

const columns = [
  { key: "size", label: "Size (cm)" },
  { key: "thickness", label: "Thickness (mm)" },
  { key: "weight", label: "Wt/Box (kg)" },
  { key: "pcs", label: "Pcs/Box" },
  { key: "sqm", label: "SqM/Box" },
  { key: "boxPallet", label: "Box/Pallet" },
  { key: "palletCont", label: "Pallet/Cont." },
  { key: "boxCont", label: "Box/Cont." },
  { key: "sqmCont", label: "SqM/Cont." },
  { key: "weightCont", label: "Wt/Cont. (kg)" },
  { key: "container", label: "Container" },
];

const PackingInfo = () => {
  const grouped = useMemo(() => {
    const map = new Map();
    rows.forEach((r) => {
      if (!map.has(r.product)) map.set(r.product, []);
      map.get(r.product).push(r);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <main>
      <PageHero
        image={packingImg}
        eyebrow="Logistics"
        title="Packing"
        italicTitle="details."
        description="Box, pallet, and container specifications across our standard tile formats — for accurate freight planning."
        height="medium"
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule" />
            <span className="eyebrow">Specification Tables</span>
          </div>
          <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-12 max-w-3xl">
            Container loading <span className="display-italic text-primary">at a glance.</span>
          </h2>

          <div className="flex flex-col gap-12 md:gap-16">
            {grouped.map(([product, productRows], idx) => (
              <motion.div
                key={product}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-sand-200">
                  <h3 className="display text-2xl md:text-[28px]">{product}</h3>
                  <span className="text-[11px] tracking-[0.22em] uppercase text-sand-500">
                    {productRows.length} {productRows.length === 1 ? "format" : "formats"}
                  </span>
                </div>

                <div className="overflow-x-auto -mx-6 md:-mx-10 lg:-mx-12 px-6 md:px-10 lg:px-12">
                  <table className="min-w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-sand-300">
                        {columns.map((c) => (
                          <th
                            key={c.key}
                            className="px-3 py-3 text-left text-[10.5px] tracking-[0.18em] uppercase font-semibold text-sand-600 whitespace-nowrap"
                          >
                            {c.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {productRows.map((r, i) => (
                        <tr
                          key={i}
                          className="border-b border-sand-200 hover:bg-cream transition-colors"
                        >
                          {columns.map((c) => (
                            <td
                              key={c.key}
                              className="px-3 py-3.5 text-ink/85 whitespace-nowrap"
                            >
                              {r[c.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 pt-6 border-t border-sand-200 text-[12.5px] text-sand-500 leading-[1.8] max-w-3xl">
            Specifications are indicative and may vary by production run. For precise loading
            calculations against a specific PO, contact our export desk — we'll prepare a
            container plan tailored to your shipment.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PackingInfo;
