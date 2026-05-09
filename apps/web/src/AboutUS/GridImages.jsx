import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/about/img1.webp';
import img2 from '../assets/about/img2.webp';
import img3 from '../assets/about/img3.webp';
import img4 from '../assets/about/img4.webp';
import img5 from '../assets/about/img5.webp';
import img6 from '../assets/about/img6.webp';

const tile = (src, span) => ({ src, span });

const tiles = [
  tile(img1, 'col-span-1 row-span-1'),
  tile(img3, 'col-span-2 row-span-2'),
  tile(img2, 'col-span-1 row-span-1'),
  tile(img4, 'col-span-1 row-span-1'),
  tile(img5, 'col-span-1 row-span-1'),
  tile(img6, 'col-span-1 row-span-1'),
];

const GridImages = () => {
  return (
    <div className="grid grid-cols-3 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4">
      {tiles.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden bg-sand-100 ${t.span}`}
        >
          <img
            src={t.src}
            alt=""
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GridImages;
