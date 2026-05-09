import React, { useEffect, useState } from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import {
  useSendProductInquiryEmail,
  useAddProductInquiry,
} from "../../hooks/Product/ProductInquiryHook";

const InquiryModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { mutate: sendEmail, loading: sendingEmail } = useSendProductInquiryEmail();
  const { mutate: addInquiry, loading: addingInquiry } = useAddProductInquiry();
  const loading = sendingEmail || addingInquiry;

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSuccess(null);
    }
  }, [isOpen]);

  // lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // close on escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = { product_name: productName, ...formData };
    let anyOk = false;
    let lastErrorMsg = null;

    try {
      await sendEmail(payload);
      anyOk = true;
    } catch (err) {
      lastErrorMsg = err?.response?.data?.message || "Failed to send email.";
    }
    try {
      const result = await addInquiry(payload);
      anyOk = true;
      if (result?.message) setSuccess(result.message);
    } catch (err) {
      lastErrorMsg = err?.response?.data?.message || "Something went wrong.";
    }

    if (anyOk) {
      setSuccess((prev) => prev || "Thank you — your inquiry has been received.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setError(lastErrorMsg || "Failed to submit inquiry. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lift">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-ink hover:bg-cream transition-colors z-10"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 lg:p-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule" />
            <span className="eyebrow">Product Inquiry</span>
          </div>
          <h2
            id="inquiry-title"
            className="display text-3xl md:text-4xl leading-[1.1] mb-2"
          >
            Request a quote.
          </h2>
          {productName && (
            <p className="text-[13px] text-sand-500 mb-8">
              About: <span className="text-ink font-medium">{productName}</span>
            </p>
          )}

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
              <span className="eyebrow !text-[10px]">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-sand-300 focus:border-ink outline-none py-3 text-[15px] text-ink placeholder-sand-400 transition-colors resize-none"
                placeholder="Quantities, formats, target market…"
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

            <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[12px] text-sand-500 max-w-sm">
                We respond within one business day.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting…" : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
