import React from "react";
import { motion } from "framer-motion";
import customization from "../assets/customization.png";
import customizationcover from "../assets/customizationcover.webp";
const Customization = () => {
  return (
    <>
      <div className="relative h-[600px]">
        <img
            src={customizationcover}
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
            Customization
          </h1>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
        Customized Products
        </h1>

        <div>
            {/* <img src={customization} alt="customization" /> */}
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 text-justify">
         Asios offers advice and ideas for decorating all parts of your home, indoors and outdoors. Our design and development team are driven by a passion to find. For us, inspiration is everywhere. Lots of solutions for making your home unique and individual. With Asios's ideas for the home, you can find out how to choose the floor or wall covering best suited to your tastes and needs, always with the latest design trends clearly in mind. Asios collections for decorating with the very latest colours, looks and patterns. With our considerable expertise and knowledge, we transform what captures our imagination into truly unique tiles and ceramic products. Let us share our discoveries with you. Our in-house design team is here to offer its expert advice on design schemes, layouts and bespoke installations, so you can always find the right product to match your creative vision.All designs created in house are Asios and our brand partners across the globe copyright however designs created for clients drawings only the tiles design elements would suppy any design right for Asios but not full copyright.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
        Your Brand Labeling on Our Innovative Quality Products
        </h1>

        <div>
            <img src={customization} alt="customization" className="w-[800px] h-[370px]" />
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 text-justify">
        Not sure where to start? Immerse yourself in our world. Visit our design collection here in website or for an in-depth exploration, visit to our corporate office in India. Asios is the leading tiles exporter, we developed specifically to advise and inspire professionals and consumers on current interior trends, latest products and ideas not just from Asios but from our brand partners across the globe. Need help with the entire process from placing the order, get manufacturing done, have an inspection and ship the product directly from India to your doorstep or directly to a fulfillment centre? Then Asios is for you. You’ve sourced a product with us, checked samples and you are ready to pull the trigger on the order. However you’d like a professional team to handle your order not just from with the factory in India, Italy, Spain and China but from our brand partners across the globe. Get in touch with us and we’ll discuss all details.
        </p>
      </div>
    </>
  );
};

export default Customization;
