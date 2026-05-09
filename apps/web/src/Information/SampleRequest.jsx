import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import sampleCover2 from "../assets/samplecover2.webp";
import { useSendInquiryEmail, useAddInquiry } from "../hooks/Inquiry/InquiryHook";
import PageHero from "../PageHero";

const SampleRequest = () => {
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
    } catch {}
    try {
      await addInquiry(formData);
      anyOk = true;
    } catch {}
    if (anyOk) {
      setSuccess("Thank you — your sample request has been received. We'll be in touch shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setError("We couldn't submit your request. Please try again or email us directly.");
    }
  };

  return (
    <main>
      <PageHero
        image={sampleCover2}
        eyebrow="Samples"
        title="Touch the surface,"
        italicTitle="not the screen."
        description="Order physical samples to evaluate colour, finish, and texture before you commit to a full project."
        height="medium"
      />

      <section className="section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Service info */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="rule" />
                <span className="eyebrow">Sample Service</span>
              </div>
              <h2 className="display text-4xl md:text-5xl lg:text-[48px] leading-[1.05] mb-7">
                See it before you <span className="display-italic text-primary">specify it.</span>
              </h2>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-5">
                We understand it can be difficult to read colour and finish from a screen. To help
                you make the right choice, we offer a sample service across most of our product
                ranges — wallets, hand boards, and full-size pieces are available to architects,
                designers, and specifiers.
              </p>
              <p className="text-[15px] text-sand-600 leading-[1.85] mb-10">
                Our catalogues include the technical detail required for full specification:
                conformance charts, slip resistance values, colour notation, and Light Reflectance
                referencing.
              </p>

              {/* Important notes */}
              <div className="border-l-2 border-primary bg-cream p-6 md:p-7">
                <span className="eyebrow !text-[10px]">Please Note</span>
                <ul className="mt-4 flex flex-col gap-3 text-[13.5px] text-sand-700 leading-[1.7]">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full shrink-0" />
                    <span>Some products are 'Special Order' items and may not be available as samples.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full shrink-0" />
                    <span>Samples give a general impression. Colour and pattern can vary between batches and at scale.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full shrink-0" />
                    <span>Requesting samples is not an order. Please allow up to 14 days for delivery.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white border border-sand-200 p-8 md:p-10 lg:p-12 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <span className="rule" />
                  <span className="eyebrow">Request Form</span>
                </div>
                <h2 className="display text-3xl md:text-4xl lg:text-[42px] leading-[1.1] mb-8">
                  Tell us what to <span className="display-italic text-primary">send.</span>
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <label className="block md:col-span-2">
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
                  <label className="block md:col-span-2">
                    <span className="eyebrow !text-[10px]">Sample Details</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors resize-none"
                      placeholder="Which collections, finishes, or sizes? Include shipping address."
                    />
                  </label>

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

                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending…" : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SampleRequest;
