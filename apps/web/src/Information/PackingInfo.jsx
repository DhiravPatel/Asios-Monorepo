import React from "react";
import { motion } from "framer-motion";
import packingImg from "../assets/packing.webp"

const PackingInfo = () => {
    const data = [
        { product: 'PORCELAIN TILES', size: '30X60', thickness: '8.50', weight: '26.5', pcs: '8', sqm: '1.44', boxPallet: '40', palletCont: '26', boxCont: '1040', sqmCont: '1497.60', weightCont: '27910.00', container: '20ft' },
        { product: 'PORCELAIN TILES', size: '60X60', thickness: '8.00', weight: '25.0', pcs: '4', sqm: '1.44', boxPallet: '40', palletCont: '27', boxCont: '1080', sqmCont: '1555.20', weightCont: '27350.00', container: '20ft' },
        { product: 'PORCELAIN TILES', size: '60X120', thickness: '8.00', weight: '26.0', pcs: '2', sqm: '1.44', boxPallet: '60 & 30', palletCont: '12 & 11', boxCont: '1050', sqmCont: '1512.00', weightCont: '27650.00', container: '20ft' },
        { product: 'PORCELAIN TILES', size: '80X80', thickness: '8.50', weight: '36.5', pcs: '3', sqm: '1.92', boxPallet: '36', palletCont: '21', boxCont: '756', sqmCont: '1451.52', weightCont: '27944.00', container: '20ft' },
        { product: 'PORCELAIN SLAB TILES', size: '80X160', thickness: '9.00', weight: '52.0', pcs: '2', sqm: '2.56', boxPallet: '28', palletCont: '19', boxCont: '532', sqmCont: '1361.92', weightCont: '27964.00', container: '20ft' },
        { product: 'CERAMIC WALL TILES', size: '20X30', thickness: '6.00', weight: '9.0', pcs: '16', sqm: '0.96', boxPallet: '120', palletCont: '24', boxCont: '2880', sqmCont: '2764.80', weightCont: '26270.00', container: '20ft' },
        { product: 'CERAMIC WALL TILES', size: '25X37.5', thickness: '7.00', weight: '8.3', pcs: '8', sqm: '0.75', boxPallet: '128', palletCont: '24', boxCont: '3072', sqmCont: '2304.00', weightCont: '25897.60', container: '20ft' },
        { product: 'CERAMIC WALL TILES', size: '30X30', thickness: '8.00', weight: '9.0', pcs: '8', sqm: '0.72', boxPallet: '128', palletCont: '24', boxCont: '3072', sqmCont: '2211.84', weightCont: '27978.00', container: '20ft' },
        { product: 'CERAMIC WALL TILES', size: '30X45', thickness: '8.00', weight: '10.5', pcs: '6', sqm: '0.81', boxPallet: '96', palletCont: '24', boxCont: '2304', sqmCont: '1866.24', weightCont: '24542.00', container: '20ft' },
        { product: 'CERAMIC WALL TILES', size: '30X60', thickness: '8.00', weight: '13.5', pcs: '5', sqm: '0.90', boxPallet: '96', palletCont: '21', boxCont: '2016', sqmCont: '1814.40', weightCont: '27566.00', container: '20ft' },
        { product: 'CERAMIC FLOOR TILES', size: '30X30', thickness: '7.00', weight: '13.0', pcs: '11', sqm: '0.99', boxPallet: '108', palletCont: '19', boxCont: '2052', sqmCont: '2031.48', weightCont: '27026.00', container: '20ft' },
        { product: 'CERAMIC FLOOR TILES', size: '40X40', thickness: '8.00', weight: '15.0', pcs: '6', sqm: '0.96', boxPallet: '84', palletCont: '22', boxCont: '1848', sqmCont: '1774.08', weightCont: '27970.00', container: '20ft' },
      ];

  return (
    <>
      <div className="relative h-[600px]">
        <img
          src={packingImg}
          className="h-full w-full object-cover"
          alt="Contact Banner"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold text-center">
            Packing Details
          </h1>
        </motion.div>
      </div>

      <section className="p-4 lg:p-8 bg-gray-50">
  <h3 className="text-lg font-bold mb-4 text-gray-800">Product Specification Table</h3>

  {/* Table */}
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-[#edebe8] text-left text-xs text-gray-600 uppercase tracking-wider">
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Size (CM)</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Thickness (MM)</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Weight/Box (Kgs)</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Pcs/Box</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">SQM/Box</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Box/Pallet</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Pallet/Cont.</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Box/Cont.</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">SQM/Cont.</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Approx Weight/Cont. (Kgs)</th>
          <th className="px-2 py-2 border border-gray-300 max-w-xs">Container Type</th>
        </tr>
      </thead>
      <tbody className="text-xs text-gray-700">
        {data.map((row, index) => (
          <tr key={index} className={`hover:bg-gray-50 transition ${index % 2 === 1 ? 'bg-[#e2e3e5]' : ''}`}>
            <td className="border border-gray-300 px-2 py-2">{row.size}</td>
            <td className="border border-gray-300 px-2 py-2">{row.thickness}</td>
            <td className="border border-gray-300 px-2 py-2">{row.weight}</td>
            <td className="border border-gray-300 px-2 py-2">{row.pcs}</td>
            <td className="border border-gray-300 px-2 py-2">{row.sqm}</td>
            <td className="border border-gray-300 px-2 py-2">{row.boxPallet}</td>
            <td className="border border-gray-300 px-2 py-2">{row.palletCont}</td>
            <td className="border border-gray-300 px-2 py-2">{row.boxCont}</td>
            <td className="border border-gray-300 px-2 py-2">{row.sqmCont}</td>
            <td className="border border-gray-300 px-2 py-2">{row.weightCont}</td>
            <td className="border border-gray-300 px-2 py-2">{row.container}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


    </>
  );
};

export default PackingInfo;
