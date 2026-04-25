import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import image from "../../assets/about_us.jpg";
import image from "../../assets/about.webp"
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const lettersRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const animation = gsap.fromTo(
      lettersRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  const text = "About Us".split("");

  return (
    <section
      ref={sectionRef}
      className="w-full md:h-screen py-14 flex items-center md:justify-between justify-center flex-col md:flex-row gap-14 container overflow-hidden"
    >
      <div className="lg:w-1/2 text-center text-black">
        <div className="flex justify-center md:justify-start">
          {text.map((letter, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              className="text-3xl lg:text-4xl"
            >
              {letter}
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 lg:text-[16px] text-sm text-justify"
        >
          Asios is the name which is synonymous with qualitative products at the
          most competitive prices. Our customer-centric approach made us the
          market leader in the building material industry. Clients are our most valuable
          asset. We believe in providing the best to our clients. We are the
          manufacturer where all your needs will get catered under one umbrella.
          Creating a good living environment for you at the best prices is our
          duty.
        </motion.p>
        
        <Link to="/about">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full shadow-lg"
        >
          Know More
        </motion.button>
        </Link>
      </div>
      <div className="lg:w-1/2 lg:block hidden">
        <img
          src={image}
          alt="About us page image"
          className="w-full max-h-[400px] object-cover rounded-md"
        />
      </div>
    </section>
  );
};

export default AboutUs;
