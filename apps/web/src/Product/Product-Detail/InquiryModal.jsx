import React, { useState } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaRegCommentDots, FaTimes, FaBox } from "react-icons/fa";
import {
  useSendProductInquiryEmail,
  useAddProductInquiry,
} from "../../hooks/Product/ProductInquiryHook";

const InquiryModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { mutate: sendEmail, loading: sendingEmail } = useSendProductInquiryEmail();
  const { mutate: addInquiry, loading: addingInquiry } = useAddProductInquiry();
  const loading = sendingEmail || addingInquiry;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { name, email, phone, message } = formData;
    const product_name = productName;
    const payload = { product_name, name, email, phone, message };

    try {
      await sendEmail(payload);
    } catch (err) {
      setError("Failed to submit inquiry. Please try again.");
    }

    try {
      const result = await addInquiry(payload);
      setSuccess(result?.message);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-center">Product Inquiry</h3>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

              {/* Product Name (readonly) */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaBox className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="product_name"
                  value={productName}
                  placeholder={productName}
                  className="w-full outline-none focus:outline-none"
                  disabled
                />
              </div>

              {/* Name Field */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full outline-none focus:outline-none"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full outline-none focus:outline-none"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaPhoneAlt className="text-gray-500 mr-3" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full outline-none focus:outline-none"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaRegCommentDots className="text-gray-500 mr-3" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full outline-none focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="p-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 w-full"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </div>

              {/* Display Success or Error Message */}
              {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
              {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryModal;
