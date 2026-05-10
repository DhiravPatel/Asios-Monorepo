import React, { useContext } from 'react';
import logo from '../src/assets/asios_logo.svg';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { AppContext } from './AppContext';

const Footer = () => {
  const { footerData } = useContext(AppContext);
  const categories = footerData || [];

  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Ambient red glow shadows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* top-edge shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        {/* upper red glows */}
        <div className="absolute -top-32 left-1/4 w-[520px] h-[260px] bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-[600px] h-[280px] bg-primary/8 rounded-full blur-3xl" />
        {/* bottom corner glows */}
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-primary/8 rounded-full blur-3xl" />
        {/* center subtle wash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/[0.04] rounded-full blur-3xl" />
      </div>

      {/* Editorial top stripe */}
      <div className="relative border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Brand column */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <Link to="/" className="inline-block">
                <img src={logo} alt="Asios" className="h-10 md:h-12 w-auto" />
              </Link>
              <p className="text-[14px] leading-relaxed text-white/65 max-w-sm">
                Crafted surfaces from Morbi, India. We export premium ceramic tiles, quartz slabs,
                sanitaryware, and decorative panels to discerning markets across the globe.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.facebook.com/asiosglobal?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/asios-global/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@asiosglobal?si=u7CNidRQInNnPMWS"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <span className="eyebrow eyebrow-light !text-white/60">Explore</span>
              <ul className="mt-5 flex flex-col gap-3 text-[13.5px] text-white/75">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/product" className="hover:text-primary transition-colors">Products</Link></li>
                <li><Link to="/catalogue" className="hover:text-primary transition-colors">E-Catalogue</Link></li>
                <li><Link to="/export" className="hover:text-primary transition-colors">Export</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-2">
              <span className="eyebrow eyebrow-light !text-white/60">Information</span>
              <ul className="mt-5 flex flex-col gap-3 text-[13.5px] text-white/75">
                <li><Link to="/tiles-calculator" className="hover:text-primary transition-colors">Tiles Calculator</Link></li>
                <li><Link to="/packing-details" className="hover:text-primary transition-colors">Packing Details</Link></li>
                <li><Link to="/quality-assurance" className="hover:text-primary transition-colors">Quality Assurance</Link></li>
                <li><Link to="/sample-request" className="hover:text-primary transition-colors">Sample Request</Link></li>
                <li><Link to="/customization" className="hover:text-primary transition-colors">Customization</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Collections */}
            <div className="lg:col-span-2">
              <span className="eyebrow eyebrow-light !text-white/60">Collections</span>
              <ul className="mt-5 flex flex-col gap-3 text-[13.5px] text-white/75">
                {categories.length > 0 ? (
                  categories.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/main-product/${item._id}`}
                        className="capitalize hover:text-primary transition-colors"
                      >
                        {item.category}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-white/40">Loading…</li>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <span className="eyebrow eyebrow-light !text-white/60">Reach Us</span>
              <div className="mt-5 flex flex-col gap-4 text-[13.5px] text-white/75">
                <a
                  href="https://www.google.com/maps/place/ASIOS+GLOBAL/@22.8141528,70.8669576,17z"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 hover:text-primary transition-colors"
                >
                  <IoLocationSharp className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span className="leading-relaxed">
                    Latest Ceramic Zone, 1st Floor, B/H Ishan Ceramic Zone 8-A, National Highway,
                    Morbi, Gujarat 363642
                  </span>
                </a>
                <a href="mailto:info@asios.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MdEmail className="w-4 h-4 shrink-0 text-primary" />
                  <span>info@asios.in</span>
                </a>
                <div className="flex items-start gap-2">
                  <FaPhoneAlt className="w-3.5 h-3.5 mt-1 shrink-0 text-primary" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:9409000751" className="hover:text-primary transition-colors">
                      +91 9409000751 <span className="text-white/50">(Export)</span>
                    </a>
                    <a href="tel:9327624243" className="hover:text-primary transition-colors">
                      +91 9327624243 <span className="text-white/50">(Domestic)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="text-[12px] text-white/50 tracking-wide">
            © 2025 Asios Global. All rights reserved.
          </span>
          <span className="text-[11px] tracking-[0.22em] uppercase text-white/40">
            Crafted in Morbi · Shipped Worldwide
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
