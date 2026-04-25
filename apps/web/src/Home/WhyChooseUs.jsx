import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import best_price from "../assets/WhyChoose Us/best-price.png";
import customer from "../assets/WhyChoose Us/customer.png";
import design from "../assets/WhyChoose Us/design.png";
import fastdelivery from "../assets/WhyChoose Us/fast-delivery.png";
import italiantech from "../assets/WhyChoose Us/italian_tech.png";
import primimumquality from "../assets/WhyChoose Us/premium_quality.png";

const whychoseus = [
  {
    icon: italiantech,
    title: "Italian Technology",
    description:
      "We use cutting-edge Italian technology to ensure the best quality in our products."
  },
  {
    icon: best_price,
    title: "Best Price",
    description:
      "We offer the best prices in the market without compromising on quality."
  },
  {
    icon: fastdelivery,
    title: "Timely Delivery",
    description:
      "Our delivery services are fast and reliable, ensuring you get your products on time."
  },
  {
    icon: customer,
    title: "Customer Satisfaction",
    description:
      "We prioritize our customers’ satisfaction above everything else."
  },
  {
    icon: primimumquality,
    title: "Premium Quality",
    description:
      "Our products are made from the highest quality materials available."
  },
  {
    icon: design,
    title: "Design",
    description:
      "Our designs are modern, sleek, and tailored to meet your preferences."
  }
];

const WhyChooseUs = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        setIsInView(rect.top <= windowHeight && rect.bottom >= 0);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray">
      <div ref={ref} className="container py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold md:text-4xl sm:text-2xl text-xl text-center flex flex-col justify-center">
            Why Choose Us
          </div>
          <span className="font-medium sm:text-sm text-xs mt-2 md:w-[650px] w-auto text-center">
            Our commitment to quality and services ensure our clients are happy.
            We’re happy to make you feel more comfortable in your home.
          </span>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5">
          {whychoseus.map((item, i) => {
            const { icon, title, description } = item;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center border border-gray hover:bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
              >
                <img src={icon} alt="icon" className="w-16 h-16 mb-3" />
                <h3 className="font-bold text-primary text-xl mb-2">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
