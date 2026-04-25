import React, { useState } from 'react';
import { motion } from 'framer-motion';
import tileCalc from '../assets/tile-calc.webp';

const TilesCalculator = () => {
  // State variables
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [size, setSize] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [requiredTiles, setRequiredTiles] = useState('');
  const [requiredBoxes, setRequiredBoxes] = useState('');


  const tileData = {
    '300x600': { pcsPerBox: 8, sqm: 1.44, sqFt: 15.49 },
    '600x600': { pcsPerBox: 4, sqm: 1.44, sqFt: 15.49 },
    '600x1200': { pcsPerBox: 2, sqm: 1.44, sqFt: 15.49 },
    '800x800': { pcsPerBox: 3, sqm: 1.92, sqFt: 20.66 },
    '800x1600': { pcsPerBox: 2, sqm: 2.56, sqFt: 27.55 },
    '1200x1200': { pcsPerBox: 2, sqm: 2.88, sqFt: 30.99 },
    '1200x1800': { pcsPerBox: 2, sqm: 4.32, sqFt: 46.48 }
  };


  const calculateTiles = () => {
    const areaInFeet = length * width;
    setSquareFeet(Math.ceil(areaInFeet)); 
    const areaInMeters = areaInFeet / 10.76;
    setSquareMeters(Math.ceil(areaInMeters)); 

    if (size) {
      const tile = tileData[size];
      const areaCoveredByOneBox = tile.sqFt;
      const boxesRequired = areaInFeet / areaCoveredByOneBox;
      setRequiredBoxes(Math.ceil(boxesRequired));
      const tilesRequired = Math.ceil(boxesRequired * tile.pcsPerBox); 
      setRequiredTiles(tilesRequired);
    }
  };

  const resetFields = () => {
    setLength('');
    setWidth('');
    setSize('');
    setSquareMeters('');
    setSquareFeet('');
    setRequiredTiles('');
    setRequiredBoxes('');
  };

  return (
    <>
      <div className="relative h-[600px]">
        <img src={tileCalc} className="h-full w-full object-cover" alt="Contact Banner" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold text-center">
            Tiles Calculator
          </h1>
        </motion.div>
      </div>

      <section className="flex flex-col lg:flex-row justify-center gap-8 p-4 lg:p-8 mt-[50px] mb-[50px]">
        {/* Tiles Calculation */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6 shadow-lg rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-[#A42832]">Tiles Calculation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Length (Feet) Of Area *</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
                placeholder="Enter length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Width (Feet) Of Area *</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
                placeholder="Enter width"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Size *</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
            >
              <option value="">Select Size</option>
              <option value="300x600">300x600</option>
              <option value="600x600">600x600</option>
              <option value="600x1200">600x1200</option>
              <option value="800x800">800x800</option>
              <option value="800x1600">800x1600</option>
              <option value="1200x1200">1200x1200</option>
              <option value="1200x1800">1200x1800</option>
            </select>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={calculateTiles}
              className="flex-1 bg-red-600 text-black py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition"
            >
              CALCULATE
            </button>
            <button
              onClick={resetFields}
              className="flex-1 bg-gray-300 text-black py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Total Area Covered */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6 shadow-lg rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-[#A42832]">Total Area Covered</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Square Meter</label>
              <input
                type="text"
                value={squareMeters}
                readOnly
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Square Feet</label>
              <input
                type="text"
                value={squareFeet}
                readOnly
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Required Tiles</label>
              <input
                type="text"
                value={requiredTiles}
                readOnly
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Required Boxes</label>
              <input
                type="text"
                value={requiredBoxes}
                readOnly
                className="mt-1 block w-full border-b-[1px] border-gray-300 focus:border-red-600 outline-none p-2 transition-all"
              />
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            This may vary based on your actual needs. This is only an approximate calculation.
          </p>
        </div>
      </section>
    </>
  );
};

export default TilesCalculator;
