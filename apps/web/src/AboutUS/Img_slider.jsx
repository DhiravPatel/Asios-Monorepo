import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import leftImg1 from "../assets/about/img1.jpg";
import leftImg2 from "../assets/about/img2.jpg";
import leftImg3 from "../assets/about/img3.jpg";
import leftImg4 from "../assets/about/img4.jpg";
import rightImg1 from "../assets/about/img5.jpg";
import rightImg2 from "../assets/about/img6.jpg";
import rightImg3 from "../assets/about/img7.jpg";
import rightImg4 from "../assets/about/img8.jpg";

gsap.registerPlugin(ScrollToPlugin);

const OppositeScrollImages = () => {
  const leftImages = [
    leftImg1,
    leftImg2,
    leftImg3,
    leftImg4,
    rightImg1,
    rightImg2,
    rightImg3,
    rightImg4
  ];

  const scrollContainerRef1 = useRef(null);

  useEffect(() => {
    const leftScrollHeight = scrollContainerRef1.current.scrollHeight;

    gsap.to(scrollContainerRef1.current, {
      scrollTo: { y: leftScrollHeight, autoKill: false },
      duration: 100,
      ease: "none",
      repeat: -1,
      modifiers: {
        scrollTo: (y) => y % leftScrollHeight
      }
    });
  }, []);

  return (
    <div className="flex w-full gap-2 ">
      <div ref={scrollContainerRef1} className="h-full overflow-hidden">
        <div className="flex flex-col gap-2">
          {leftImages.map((image, index) => (
            <div key={index} className="w-full h-96">
              <img
                src={image}
                alt={`Left Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {leftImages.map((image, index) => (
            <div key={index + leftImages.length} className="w-full h-96">
              <img
                src={image}
                alt={`Left Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OppositeScrollImages;
