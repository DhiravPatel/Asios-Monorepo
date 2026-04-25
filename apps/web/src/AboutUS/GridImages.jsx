import React from 'react';
import img1 from '../assets/about/img1.webp';
import img2 from '../assets/about/img2.webp';
import img3 from '../assets/about/img3.webp';
import img4 from '../assets/about/img4.webp';
import img5 from '../assets/about/img5.webp';
import img6 from '../assets/about/img6.webp';
const GridImages = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="grid-image col-span-1">
        <img src={img1} alt="Image 1" className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>
      <div className="grid-image col-span-1">
        <img src={img2} alt="Image 2" className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>
      <div className="grid-image col-span-1">
        <img src={img6} alt="Image 2" className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>
      <div className="grid-image col-span-2">
        <img src={img3} alt="Image 3" className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>
      <div className="grid-image col-span-1">
        <img src={img4} alt="Image 4" className="object-cover w-full rounded-lg shadow-lg" />
      </div>
      <div className="grid-image col-span-1">
        <img src={img5} alt="Image 5" className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default GridImages;
