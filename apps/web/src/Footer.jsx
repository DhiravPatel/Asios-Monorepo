import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiArrowUp, FiMail, FiPhone } from 'react-icons/fi';
import logo from '../src/assets/asios_logo.svg';
import { AppContext } from './AppContext';

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/product', label: 'Products' },
  { to: '/catalogue', label: 'E-Catalogue' },
  { to: '/export', label: 'Export' },
  { to: '/contact', label: 'Contact' },
];

const informationLinks = [
  { to: '/tiles-calculator', label: 'Tiles Calculator' },
  { to: '/packing-details', label: 'Packing Details' },
  { to: '/quality-assurance', label: 'Quality Assurance' },
  { to: '/sample-request', label: 'Sample Request' },
  { to: '/customization', label: 'Customization' },
  { to: '/blog', label: 'Blog' },
];

// Repeated wordmark for the marquee (duplicated for seamless scroll)
const wordmarkSeq = Array.from({ length: 8 });

const Footer = () => {
  const { footerData } = useContext(AppContext);
  const categories = footerData || [];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* Ambient red glow shadows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="absolute -top-32 left-1/3 w-[500px] h-[260px] bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-[500px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-primary/6 rounded-full blur-3xl" />
      </div>

      {/* MAIN BODY — compact link grid */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-10 md:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-8 md:gap-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-4 flex flex-col gap-4">
              <Link to="/" className="inline-block">
                <img src={logo} alt="Asios" className="h-9 md:h-10 w-auto" />
              </Link>
              <p className="text-[13px] leading-relaxed text-white/55 max-w-xs">
                Crafted surfaces from Morbi, India — exported to 50+ markets across five continents.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href="https://www.facebook.com/asiosglobal?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaFacebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/asios-global/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.youtube.com/@asiosglobal?si=u7CNidRQInNnPMWS"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 inline-flex items-center justify-center border border-white/20 hover:border-primary hover:bg-primary transition-colors"
                >
                  <FaYoutube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="eyebrow eyebrow-light !text-white/55 !text-[10px]">Explore</span>
              </div>
              <ul className="flex flex-col gap-2 text-[12.5px] text-white/70">
                {exploreLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-500 ease-editorial" />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="eyebrow eyebrow-light !text-white/55 !text-[10px]">Information</span>
              </div>
              <ul className="flex flex-col gap-2 text-[12.5px] text-white/70">
                {informationLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-500 ease-editorial" />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="eyebrow eyebrow-light !text-white/55 !text-[10px]">Collections</span>
              </div>
              <ul className="flex flex-col gap-2 text-[12.5px] text-white/70">
                {categories.length > 0 ? (
                  categories.slice(0, 6).map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/main-product/${item._id}`}
                        className="group inline-flex items-center gap-1.5 capitalize hover:text-primary transition-colors"
                      >
                        <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-500 ease-editorial" />
                        <span>{item.category}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-white/35">Loading…</li>
                )}
              </ul>
            </div>

            {/* Reach Us */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <div className="mb-4">
                <span className="eyebrow eyebrow-light !text-white/55 !text-[10px]">Reach Us</span>
              </div>
              <a
                href="https://www.google.com/maps/place/ASIOS+GLOBAL/@22.8141528,70.8669576,17z"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-2 text-[12.5px] text-white/70 hover:text-primary transition-colors leading-relaxed mb-3"
              >
                <IoLocationSharp className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                <span>
                  Latest Ceramic Zone, B/H Ishan Ceramic Zone 8-A, Morbi, Gujarat 363642
                </span>
              </a>
              <a
                href="mailto:info@asios.in"
                className="flex items-center gap-2 text-[12.5px] text-white/70 hover:text-primary transition-colors mb-3"
              >
                <FiMail className="w-3.5 h-3.5 shrink-0 text-primary" />
                <span>info@asios.in</span>
              </a>
              <div className="flex items-start gap-2 text-[12.5px] text-white/70">
                <FiPhone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                <div className="flex flex-col gap-1.5">
                  <a
                    href="tel:9409000751"
                    className="whitespace-nowrap hover:text-primary transition-colors"
                  >
                    +91 9409000751 <span className="text-white/35">/ Export</span>
                  </a>
                  <a
                    href="tel:9327624243"
                    className="whitespace-nowrap hover:text-primary transition-colors"
                  >
                    +91 9327624243 <span className="text-white/35">/ Domestic</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WORDMARK MARQUEE — thin scrolling band */}
      <div className="relative border-y border-white/10 overflow-hidden">
        <div className="marquee py-4 md:py-5">
          <div className="marquee__track">
            {wordmarkSeq.map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-8 display !text-white/[0.12] text-3xl md:text-4xl tracking-[-0.01em] select-none whitespace-nowrap"
              >
                <span>ASIOS GLOBAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-5">
            <span className="text-[11px] text-white/45 tracking-wide">
              © 2025 Asios Global. All rights reserved.
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/35">
              Crafted in Morbi · Shipped Worldwide
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase font-semibold text-white/55 hover:text-primary transition-colors"
          >
            <span>Back to Top</span>
            <span className="w-7 h-7 inline-flex items-center justify-center border border-white/20 group-hover:border-primary group-hover:bg-primary transition-colors">
              <FiArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
