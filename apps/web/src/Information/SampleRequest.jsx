import React, { useState } from "react";
import { motion } from "framer-motion";
import sampleCover2 from '../assets/samplecover2.webp';
import { useSendInquiryEmail, useAddInquiry } from "../hooks/Inquiry/InquiryHook";

const SampleRequest = () => {


  const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
      phone:""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { mutate: sendEmail, loading: sendingEmail } = useSendInquiryEmail();
    const { mutate: addInquiry, loading: addingInquiry } = useAddInquiry();
    const loading = sendingEmail || addingInquiry;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await sendEmail(formData);
      if (result?.success) {
        setSuccess("Inquiry submitted successfully!");
        setFormData({ name: "", email: "", message: "", phone:"" });
      }
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.");
    }

    try {
      await addInquiry(formData);
      setSuccess("Inquiry submitted successfully!");
      setFormData({ name: "", email: "", message: "",phone:"" });
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.");
    }
  };


  return (
    <>  
      <div className="relative h-[600px]">
        <img
            src={sampleCover2}
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
            Sample Request
          </h1>
        </motion.div>
      </div>

      <section className="flex flex-col lg:flex-row justify-center bg-white items-start">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
          Sample Service
        </h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
          We understand it can be difficult to see the color and finish of a
          product online. To help you make the right choice, we offer a sample
          service on many of our product ranges. Asios have a wide-ranging set
          of sample wallets, hand boards and other support materials available
          to architects, designers and specifiers. All size samples are
          available but please contact the office to arrange delivery. Our
          catalogues includes all the information required for detailed
          specifications such as technical conformance charts, slip resistance
          values, in addition to comprehensive and detailed color notation and
          Light Reflectance referencing.  
        </p>
        <p className="font-semibold leading-relaxed mb-6 text-justify">• Please Note:</p>
        <p className="text-gray-600 leading-relaxed mb-6 text-justify">Some of our products do
          not have the option for samples as they may be ‘Special Order’ items.
          Samples provided are intended to give the buyer a general impression
          of the color and pattern. Colors vary from batch to batch and exact
          matching between sample pieces and goods ordered cannot be guaranteed.
          When fitted, some patterns can become strongly apparent, which may not
          be obvious from the sample. Please be aware that requesting samples is
          not an actual order, and you will not receive a confirmation for it.
          We deal with sample requests promptly, but some need to be ordered in,
          and others are sent out directly by the our brand partner, so please
          allow up to 14 days for delivery.
          </p>
        </div>


        <div className="w-full lg:w-1/2 relative mt-16 mb-5 lg:pr-16">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
          Request for Sample
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border-b border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="p-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
        </div>

      </section>


    </>
  );
};

export default SampleRequest;
