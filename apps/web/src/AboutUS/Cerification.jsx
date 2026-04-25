import React from "react";
import iso from "../assets/ISO.png";
import REX from "../assets/REX.png";
import fieo from "../assets/fieo.png";
import cc from "../assets/cc.png";
import { motion } from "framer-motion";
const data = [
  {
    id: 1,
    img: iso,
    title: "ISO 9001:2015",
    description:
      "Our company has been certified under the ISO 9001:2015 quality management system, ensuring that we meet the highest standards of quality management."
  },
  {
    id: 2,
    img: REX,
    title: "REX",
    description:
      "We play a crucial role in simplifying trade procedures and ensuring that our products benefit from preferential tariff treatment in partner countries."
  },
  {
    id: 3,
    img: fieo,
    title: "FIEO",
    description:
      "This certification symbolizes our dedication to promoting Indian exports on a global scale."
  },
  {
    id: 4,
    img: cc,
    title: "CE",
    description:
      "Our products proudly carry the CE mark, indicating compliance with European Union directives and regulations."
  }
];

const Cerification = () => {
  return (
    <div className="container lg:py-20 py-14">
      <h2 className="font-bold text-center mb-10">Certification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((data) => (
          <div
            key={data.id}
            className="border border-gray shadow-sm hover:shadow-lg p-4 w-full rounded-lg flex flex-col justify-start items-start gap-2 cursor-pointer"
          >
            <motion.div
              className="flex flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={data.img} alt="" srcset="" className="h-[100px]" />
              <div>
                <div className="flex flex-col s">
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-start">{data.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cerification;
