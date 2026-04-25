import React from "react";
// import aboutus from "../assets/4.webp";
import aboutus from "../assets/about.webp"
import bg from "../assets/about/checks-bg.png";
import aboutimg from "../assets/about/about_img.webp";
import { motion } from "framer-motion";
import GlobalFootprint from "./GlobalFootprint";
import Cerification from "./Cerification";
import GridImages from "./GridImages";

const commitment = [
  {
    title: "Our Vision",
    desc: "Our vision is to become the most trustable supplier of ceramic products globally with best in service. We value our customers and build strong connection with them to expand our global reach and come together as a strongest team."
  },
  {
    title: "Our Mission",
    desc: "Our mission is to provide our customers with the best quality ceramic products at competitive prices. We strive to deliver exceptional service and ensure that our customers are satisfied with our products and services."
  },
  {
    title: "Our Values",
    desc: "At Asios Global, we are committed to excellence in everything we do. We believe in providing our customers with the best quality products and services, and we are dedicated to maintaining the highest standards of integrity and trust."
  },

  {
    title: "Our Philosophy",
    desc: "We believe in providing our customers with the best quality products and services. We strive to exceed our customers' expectations and deliver exceptional value."
  }
];
const card = [
  {
    title: "Foundations of Excellence",
    desc: "In 2017, Asios laid the cornerstone for a journey dedicated to tile craftsmanship. With a vision of redefining spaces, we embarked on a mission to offer unparalleled quality and design. This marked the beginning of a legacy built on precision and passion."
  },
  {
    title: "Innovation Unleashed",
    desc: "In the year 2020, Asios embraced innovation as a driving force. We expanded our product range to incorporate cutting-edge designs, materials, and technology. Despite global challenges, our commitment to delivering excellence in every tile remained unwavering, earning us the trust of our growing clientele. "
  },
  {
    title: "Design Diversity",
    desc: "In 2021, Asios celebrated a year of design diversity. We introduced an array of styles and patterns to cater to various tastes and preferences. The year witnessed the blossoming of creativity, making us a go-to destination for those seeking not just tiles but a curated experience in enhancing their living spaces."
  },
  {
    title: "Pinnacles Of Success",
    desc: "As of 2023, Asios has reached new heights. Our commitment to quality, innovation, and customer satisfaction has resulted in an ever-expanding presence. With a continued focus on excellence, we have become synonymous with toptier tile solutions, enriching homes and commercial spaces across the globe. "
  }
];
const AboutUS = () => {
  return (
    <div>
      <div className="">
        <div className="relative h-[600px]">
          <img
            src={aboutus}
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
              About Us
            </h1>
          </motion.div>
        </div>
        <div className="bg-gray">
          <div className=" container md:py-32 py-10">
            <div className="flex lg:flex-row flex-col gap-4 items-start relative">
              <img
                src={bg}
                className="absolute top-0 left-0 h-full w-full object-cover inset-0 sm:block hidden "
                alt=""
              />
              <div className="lg:w-1/2 relative">
                <img
                  src={aboutimg}
                  alt="about image"
                  srcset=""
                  className="rounded-lg w-full lg:max-w-[600px] h-[400px] object-cover"
                />
              </div>
              <div className="lg:w-1/2 relative">
                <div className="flex flex-col gap-4">
                  <h3 className=" float-left font-semibold lg:w-[400px] w-full">
                    Asios Global: A Legacy Of Export Industry
                  </h3>
                  <div className="text-justify">
                    <p>
                      Asios Global, based in Morbi City since 2021, has rapidly
                      established itself as a leading export company in the
                      building material industry. Specializing in a diverse range of
                      products such as porcelain tiles, bath ware and decorative panels, Asios Global has built a reputation for
                      delivering high-quality goods to clients worldwide. With a
                      commitment to excellence and customer satisfaction, the
                      company has become a trusted name in the global market,
                      catering to both residential and commercial needs.
                    </p>
                    <p>
                      With an extensive product range that includes a variety of
                      tiles and sanitaryware, Asios Global offers innovative
                      designs and durable materials that meet the demands of
                      modern architecture and interior design.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center p-8 lg:pt-16 flex justify-center">
              <h3 className=" font-bold lg:max-w-[800px] w-full ">
                Elevate{" "}
                <span className="font-semibold">
                  {" "}
                  Every Detail: Discover the Exquisite{" "}
                </span>{" "}
                Stone, Tiles and Bathware <span> Collection.</span>
              </h3>
            </div>
          </div>

          <div className="bg-white lg:py-28 py-14">
            <div className="container flex lg:flex-row flex-col justify-between">
              <div className="lg:w-1/2 w-full">
                <h2 className="lg:max-w-[600px] w-full font-semibold">
                  Asios Global: A Commitment to Excellence
                </h2>
                {commitment.map((data, index) => (
                  <div key={index} className="flex flex-col gap-3 mt-5">
                    <div>
                      <div>
                        <div className="flex flex-row items-center gap-2">
                          <div className="boll"></div>
                          <h3 className="capitalize font-bold">{data.title}</h3>
                        </div>
                        <p className="ml-8 mt-2">{data.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/2 md:block hidden">
                <div className="h-full max-h-[600px] overflow-hidden">
                  <GridImages />
                </div>
              </div>
            </div>
          </div>
          <div className=" ">
            <div className="container text-center py-10">
              <div className="milestone-section">
                <h2 className="text-center text-3xl font-bold mb-6">
                  Our Milestones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {card.map((data, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray shadow-sm hover:shadow-lg p-4 w-full rounded-lg flex flex-col justify-start items-start gap-2 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <h3 className="font-semibold font-sans">{data.title}</h3>
                      <p className="text-start">{data.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" ">
              <Cerification />
            </div>
          </div>
          <div className="bg-white">
            <div className=" ">
              <GlobalFootprint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
