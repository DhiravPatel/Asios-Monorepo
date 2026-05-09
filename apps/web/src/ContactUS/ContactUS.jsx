import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useSendInquiryEmail, useAddInquiry } from "../hooks/Inquiry/InquiryHook";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const ContactUS = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { mutate: sendEmail, loading: sendingEmail } = useSendInquiryEmail();
  const { mutate: addInquiry, loading: addingInquiry } = useAddInquiry();
  const loading = sendingEmail || addingInquiry;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let anyOk = false;
    try {
      const result = await sendEmail(formData);
      if (result?.success) anyOk = true;
    } catch {
      // swallow; we still try to persist below
    }
    try {
      await addInquiry(formData);
      anyOk = true;
    } catch {
      // handled below
    }

    if (anyOk) {
      setSuccess("Thank you — your inquiry has been received. We'll be in touch shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setError("We couldn't submit your inquiry. Please try again or email us directly.");
    }
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pt-20 md:pt-28 pb-16 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Contact</span>
            </div>
            <h1 className="display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Let's begin a <br />
              <span className="display-italic text-primary">conversation.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] text-sand-600 leading-[1.85] max-w-2xl">
              Whether you're sourcing for a single project or building a long-term supply
              relationship — write to us. Our export desk responds within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Details */}
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Reach Us Directly</span>
              </div>
              <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-10">
                Speak to the <span className="display-italic text-primary">Asios team.</span>
              </h2>

              {/* Contact tiles */}
              <div className="flex flex-col divide-y divide-sand-200 border-y border-sand-200">
                <div className="py-6 flex items-start gap-5">
                  <span className="w-10 h-10 shrink-0 inline-flex items-center justify-center border border-sand-300 text-primary">
                    <FiPhone className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <span className="eyebrow !text-[10px]">Phone</span>
                    <div className="mt-2 flex flex-col gap-1.5 text-[14.5px] text-ink">
                      <a href="tel:9409000751" className="hover:text-primary transition-colors">
                        +91 9409000751 <span className="text-sand-500">(Export)</span>
                      </a>
                      <a href="tel:9327624243" className="hover:text-primary transition-colors">
                        +91 9327624243 <span className="text-sand-500">(Domestic)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="py-6 flex items-start gap-5">
                  <span className="w-10 h-10 shrink-0 inline-flex items-center justify-center border border-sand-300 text-primary">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <span className="eyebrow !text-[10px]">Email</span>
                    <a
                      href="mailto:info@asios.in"
                      className="mt-2 block text-[14.5px] text-ink hover:text-primary transition-colors"
                    >
                      info@asios.in
                    </a>
                  </div>
                </div>

                <div className="py-6 flex items-start gap-5">
                  <span className="w-10 h-10 shrink-0 inline-flex items-center justify-center border border-sand-300 text-primary">
                    <FiMapPin className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <span className="eyebrow !text-[10px]">Address</span>
                    <a
                      href="https://maps.app.goo.gl/prVMzFBLSudXRiLd9"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-[14.5px] text-ink leading-[1.7] hover:text-primary transition-colors"
                    >
                      Latest Ceramic Zone, 1st Floor,<br />
                      B/H Ishan Ceramic Zone 8-A, National Highway,<br />
                      Morbi, Gujarat 363642
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10">
                <span className="eyebrow !text-[10px]">Follow</span>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/asiosglobal?mibextid=ZbWKwL"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-11 h-11 inline-flex items-center justify-center border border-sand-300 text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/asios-global/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 inline-flex items-center justify-center border border-sand-300 text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@asiosglobal?si=u7CNidRQInNnPMWS"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-11 h-11 inline-flex items-center justify-center border border-sand-300 text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="mt-10 p-6 bg-cream border-l-2 border-primary">
                <span className="eyebrow !text-[10px]">Office Hours</span>
                <p className="mt-2 text-[14px] text-sand-700 leading-[1.7]">
                  Monday – Saturday · 9:30 AM – 6:30 PM IST<br />
                  Closed on public holidays
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white border border-sand-200 p-8 md:p-10 lg:p-12 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule" />
                  <span className="eyebrow">Send a Message</span>
                </div>
                <h2 className="display text-3xl md:text-4xl lg:text-[44px] leading-[1.1] mb-8">
                  Tell us about your <span className="display-italic text-primary">project.</span>
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-1">
                    <label className="block">
                      <span className="eyebrow !text-[10px]">Your Name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors"
                        placeholder="Full name"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block">
                      <span className="eyebrow !text-[10px]">Email</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors"
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block">
                      <span className="eyebrow !text-[10px]">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors"
                        placeholder="Including country code"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block">
                      <span className="eyebrow !text-[10px]">Message</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors resize-none"
                        placeholder="Tell us about your sourcing needs, project, or quantities…"
                      />
                    </label>
                  </div>

                  {error && (
                    <div className="md:col-span-2 flex items-start gap-2 text-[13.5px] text-primary">
                      <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  {success && (
                    <div className="md:col-span-2 flex items-start gap-2 text-[13.5px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3">
                      <FiCheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[12px] text-sand-500 max-w-md">
                      By submitting, you agree to be contacted by Asios Global about your inquiry.
                      We never share your details.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending…" : "Submit Inquiry"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick alt links */}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-sand-600">
                <span className="eyebrow !text-[10px]">Or</span>
                <Link to="/catalogue" className="btn-link !text-[11px]">
                  Browse E-Catalogue <FiArrowUpRight className="arrow w-3.5 h-3.5" />
                </Link>
                <Link to="/sample-request" className="btn-link !text-[11px]">
                  Request a Sample <FiArrowUpRight className="arrow w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pb-20 md:pb-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="rule" />
                <span className="eyebrow">Visit</span>
              </div>
              <h2 className="display text-3xl md:text-4xl leading-[1.1]">
                Find us in <span className="display-italic text-primary">Morbi.</span>
              </h2>
            </div>
            <a
              href="https://maps.app.goo.gl/prVMzFBLSudXRiLd9"
              target="_blank"
              rel="noreferrer"
              className="btn-link"
            >
              Open in Google Maps <FiArrowUpRight className="arrow w-4 h-4" />
            </a>
          </div>
          <div className="border border-sand-200 shadow-soft overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.68446797024!2d70.86953249999999!3d22.814152800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598df7d1a60d67%3A0x24006f9a055d9da2!2sASIOS%20GLOBAL!5e0!3m2!1sen!2sin!4v1734805253388!5m2!1sen!2sin"
              className="w-full h-[420px] md:h-[520px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Asios Global location"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUS;
