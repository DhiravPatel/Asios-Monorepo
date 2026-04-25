import React, { useState } from "react";
import {  FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import banner from "../assets/contactus.jpg";
import { motion } from "framer-motion";
import { useSendInquiryEmail, useAddInquiry } from "../hooks/Inquiry/InquiryHook";

const ContactUS = () => {
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
        {/* <img
          src={banner}
          className="h-full w-full object-cover"
          alt="Contact Banner"
        /> */}
        <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.68446797024!2d70.86953249999999!3d22.814152800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598df7d1a60d67%3A0x24006f9a055d9da2!2sASIOS%20GLOBAL!5e0!3m2!1sen!2sin!4v1734805253388!5m2!1sen!2sin"
    className="h-full w-full"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map Location"
  ></iframe>
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

        {/* <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold text-center">
            Contact us
          </h1>
        </motion.div> */}
      </div>

      <div className="container md:my-32 my-20">
        <div className="flex flex-col md:flex-row">
          <motion.div
            className="md:w-1/2 p-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
            <div className="flex flex-col gap-3 mt-[30px]">
              <div className="flex gap-2">

              
              {/* <Link to="tel:9998299800" className="flex">  */}
              <div className="font-semibold">
                Phone :
              </div>
              <div className="flex flex-col">
              <p><Link to='tel:9409000751'><span>+91 9409000751 (Export)</span></Link></p>
              <p><Link to='tel:9327624243'><span>+91 9327624243 (Domestic)</span></Link></p>
              </div>
              </div>  
              {/* </Link> */}
              <p><Link to="mailto:info@asios.in"><span className="font-semibold mr-[8px]">Email :</span> info@asios.in</Link></p>
              <a href="https://maps.app.goo.gl/prVMzFBLSudXRiLd9" 
                target="_blank" >
                <p>
                  <span className="font-semibold">Address : </span> 
                   Latest Ceramic Zone, 1st Floor, B/H Ishan Ceramic Zone 8-A, National Highway, Morbi, Gujarat 363642
                </p>
              </a>

              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.youtube.com/@asiosglobal?si=u7CNidRQInNnPMWS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-2xl text-red-600 hover:text-red-400" />
                </a>
                <a
                  href="https://www.facebook.com/asiosglobal?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-2xl text-blue-600 hover:text-blue-400" />
                </a>
                <a
                  href="https://www.linkedin.com/company/asios-global/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-500" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </motion.div>
        </div>
      </div>
    </>
  );

};

export default ContactUS;
