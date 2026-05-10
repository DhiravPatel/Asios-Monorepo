import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import logo from "../src/assets/asios_logo.svg";
import { AppContext } from "./AppContext";

const informationLinks = [
  { to: "/tiles-calculator", label: "Tiles Calculator" },
  { to: "/packing-details", label: "Packing Details" },
  { to: "/quality-assurance", label: "Quality Assurance" },
  { to: "/sample-request", label: "Sample Request" },
  { to: "/customization", label: "Customization" },
  { to: "/blog", label: "Blog" },
];

const announcements = [
  "Crafted in Morbi · Shipped to 50+ markets",
  "Direct manufacturer · Replies within one business day",
  "Quality assured · Inspected at every production stage",
  "Sample requests welcome · Catalogue updated 2026",
];

// Letter-stagger animation component
const LetterStack = ({ label }) => (
  <span className="nav-letter__stack">
    <span className="nav-letter__row">
      {label.split("").map((c, i) => (
        <span
          key={`a-${i}`}
          className="nav-letter__char"
          style={{ transitionDelay: `${i * 22}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
    <span className="nav-letter__row nav-letter__row--ghost" aria-hidden="true">
      {label.split("").map((c, i) => (
        <span
          key={`b-${i}`}
          className="nav-letter__char"
          style={{ transitionDelay: `${i * 22}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  </span>
);

// Wraps NavLink with letter-stagger animation
const NavLetterLink = ({ to, label, end, withChevron, group }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `nav-letter ${isActive ? "is-active" : ""} ${group ? "group" : ""}`
    }
  >
    <LetterStack label={label} />
    {withChevron && <FiChevronDown className="nav-letter__chevron w-3 h-3" />}
    <span className="nav-letter__dot" />
  </NavLink>
);

// Stagger variants for entry animation
const navContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideAnnouncement, setHideAnnouncement] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const { footerData } = useContext(AppContext);
  const categories = footerData || [];
  const location = useLocation();

  const toggleMobileSection = (key) =>
    setOpenMobileSection((prev) => (prev === key ? null : key));

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHideAnnouncement(y > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build marquee content (duplicated for seamless loop)
  const marqueeItems = [...announcements, ...announcements];

  // On the home page at the top of the viewport, the header overlays the hero
  // image transparently. Once scrolled, the glass-blur kicks in like other pages.
  const isHomeTop = location.pathname === "/" && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full ${isHomeTop ? "is-transparent" : ""}`}
    >
      {/* Marquee announcement bar — dark glass */}
      <div
        className={`relative bg-ink/85 backdrop-blur-xl text-white overflow-hidden transition-all duration-500 ease-editorial border-b border-white/10 ${
          hideAnnouncement ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
        aria-hidden={hideAnnouncement}
      >
        {/* ambient red shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 left-1/4 w-64 h-32 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -top-6 right-1/3 w-72 h-32 bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative marquee h-9 flex items-center">
          <div className="marquee__track">
            {marqueeItems.map((msg, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3.5 text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-medium text-white/85"
              >
                <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav — transparent on home top, frosted glass elsewhere */}
      <div
        className={`relative border-b transition-all duration-500 ease-editorial ${
          isHomeTop
            ? "bg-transparent border-transparent"
            : scrolled
            ? "bg-white/80 backdrop-blur-2xl border-sand-200/70 shadow-soft"
            : "bg-white/65 backdrop-blur-xl border-sand-200/40"
        }`}
      >
        {/* Soft dark gradient backdrop — only when transparent over hero,
            keeps white nav text legible regardless of image content beneath */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-b from-black/45 via-black/20 to-transparent ${
            isHomeTop ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ambient color blobs behind glass — hidden when fully transparent */}
        <div
          className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${
            isHomeTop ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute -top-24 left-1/4 w-[420px] h-[180px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-16 right-1/4 w-[480px] h-[200px] bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-sand-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between h-16 md:h-20">
            {/* Left nav */}
            <motion.nav
              variants={navContainer}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center justify-end gap-8 xl:gap-10"
            >
              <motion.div variants={navItem}>
                <NavLetterLink to="/" end label="Home" />
              </motion.div>
              <motion.div variants={navItem}>
                <NavLetterLink to="/about" label="About" />
              </motion.div>

              {/* Products mega-menu */}
              <motion.div variants={navItem} className="relative group">
                <NavLetterLink to="/product" label="Products" withChevron group />
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-editorial absolute left-1/2 -translate-x-1/2 top-full pt-6">
                  <div className="relative min-w-[280px] bg-white/85 backdrop-blur-xl shadow-lift border border-sand-200/70 overflow-hidden">
                    {/* ambient red glow */}
                    <div className="absolute -top-16 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative px-6 pt-5 pb-3">
                      <span className="eyebrow !text-[10px]">Collections</span>
                    </div>
                    <div className="relative pb-3">
                      {categories.length > 0 ? (
                        categories.map((item) => (
                          <Link
                            key={item._id}
                            to={`/main-product/${item._id}`}
                            className="group/item flex items-center justify-between px-6 py-2.5 text-[13px] text-ink/85 hover:text-primary hover:bg-cream/70 transition-colors"
                          >
                            <span className="capitalize">{item.category}</span>
                            <FiArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                          </Link>
                        ))
                      ) : (
                        <div className="px-6 py-2.5 text-[13px] text-sand-400">
                          Loading…
                        </div>
                      )}
                    </div>
                    <div className="relative border-t border-sand-200/70 px-6 py-3">
                      <Link
                        to="/product"
                        className="text-[11px] tracking-[0.22em] uppercase font-semibold text-primary hover:text-primary-dark"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Information dropdown */}
              <motion.div variants={navItem} className="relative group">
                <button type="button" className="nav-letter group">
                  <LetterStack label="Information" />
                  <FiChevronDown className="nav-letter__chevron w-3 h-3" />
                  <span className="nav-letter__dot" />
                </button>
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-editorial absolute left-1/2 -translate-x-1/2 top-full pt-6">
                  <div className="relative min-w-[230px] bg-white/85 backdrop-blur-xl shadow-lift border border-sand-200/70 py-3 overflow-hidden">
                    {/* ambient glow */}
                    <div className="absolute -top-16 -left-10 w-48 h-48 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative">
                      {informationLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block px-6 py-2.5 text-[13px] text-ink/85 hover:text-primary hover:bg-cream/70 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.nav>

            {/* Logo — centered on desktop, left on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center lg:px-10 xl:px-14 shrink-0"
            >
              <Link to="/" aria-label="Asios home" className="block">
                <img
                  src={logo}
                  alt="Asios"
                  className={`w-auto transition-all duration-500 ease-editorial ${
                    scrolled ? "h-8 md:h-10" : "h-9 md:h-11"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Right nav */}
            <motion.nav
              variants={navContainer}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center justify-start gap-8 xl:gap-10"
            >
              <motion.div variants={navItem}>
                <NavLetterLink to="/export" label="Export" />
              </motion.div>
              <motion.div variants={navItem}>
                <NavLetterLink to="/catalogue" label="E-Catalogue" />
              </motion.div>
              <motion.div variants={navItem}>
                <NavLetterLink to="/contact" label="Contact" />
              </motion.div>
            </motion.nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className={`lg:hidden p-2 -mr-2 relative w-10 h-10 inline-flex items-center justify-center transition-colors duration-300 ${
                isHomeTop ? "text-white" : "text-ink"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span
                className={`absolute transition-all duration-400 ease-editorial ${
                  isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <FaBars size={20} />
              </span>
              <span
                className={`absolute transition-all duration-400 ease-editorial ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                }`}
              >
                <FaTimes size={20} />
              </span>
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile fullscreen drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-cream/95 backdrop-blur-2xl transition-transform duration-700 ease-editorial overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* ambient color glow inside drawer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-20 w-[500px] h-[500px] bg-primary/12 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-sand-200/60 rounded-full blur-3xl" />
        </div>

        {/* Drawer header */}
        <div className="relative flex items-center justify-between h-16 md:h-20 px-6 md:px-10 border-b border-sand-200/60">
          <img src={logo} alt="Asios" className="h-9 md:h-11 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-ink"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <motion.div
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
          }}
          className="relative h-[calc(100%-4rem)] md:h-[calc(100%-5rem)] overflow-y-auto px-6 md:px-10 py-6"
        >
          <nav className="flex flex-col">
            {[
              { type: "link", to: "/", label: "Home", index: "01" },
              { type: "link", to: "/about", label: "About", index: "02" },
              { type: "expandable", key: "products", label: "Products", index: "03" },
              { type: "expandable", key: "information", label: "Information", index: "04" },
              { type: "link", to: "/export", label: "Export", index: "05" },
              { type: "link", to: "/catalogue", label: "E-Catalogue", index: "06" },
              { type: "link", to: "/contact", label: "Contact", index: "07" },
            ].map((item) => {
              const variants = {
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              };

              if (item.type === "expandable") {
                const isExpanded = openMobileSection === item.key;
                return (
                  <motion.div
                    key={item.key}
                    variants={variants}
                    className="border-b border-sand-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(item.key)}
                      aria-expanded={isExpanded}
                      className="w-full group flex items-center gap-5 py-4 hover:bg-white/50 transition-colors px-2 -mx-2 text-left"
                    >
                      <span className="w-7 shrink-0 flex items-center">
                        <span
                          className={`block h-px bg-primary transition-all duration-500 ease-editorial ${
                            isExpanded ? "w-7" : "w-4 group-hover:w-6"
                          }`}
                        />
                      </span>
                      <span
                        className={`display text-3xl md:text-4xl flex-1 transition-colors ${
                          isExpanded ? "text-primary" : "group-hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </span>
                      <FiChevronDown
                        className={`w-5 h-5 mt-1 transition-all duration-500 ease-editorial ${
                          isExpanded
                            ? "rotate-180 text-primary"
                            : "text-sand-400 group-hover:text-ink"
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-editorial overflow-hidden ${
                        isExpanded ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="flex flex-col gap-3 pl-12 pt-2">
                          {item.key === "products" && (
                            <>
                              <Link
                                to="/product"
                                onClick={() => setIsOpen(false)}
                                className="text-[13.5px] tracking-[0.22em] uppercase font-semibold text-primary hover:text-primary-dark transition-colors"
                              >
                                All Products →
                              </Link>
                              {categories.length > 0 ? (
                                categories.map((cat) => (
                                  <Link
                                    key={cat._id}
                                    to={`/main-product/${cat._id}`}
                                    onClick={() => setIsOpen(false)}
                                    className="capitalize text-[14px] text-ink/75 hover:text-primary transition-colors"
                                  >
                                    {cat.category}
                                  </Link>
                                ))
                              ) : (
                                <span className="text-[13px] text-sand-400">Loading…</span>
                              )}
                            </>
                          )}
                          {item.key === "information" &&
                            informationLinks.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className="text-[14px] text-ink/75 hover:text-primary transition-colors"
                              >
                                {link.label}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div key={item.to} variants={variants}>
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-5 py-4 border-b border-sand-200 hover:bg-white/50 transition-colors px-2 -mx-2"
                  >
                    <span className="w-7 shrink-0 flex items-center">
                      <span className="block w-4 h-px bg-primary transition-all duration-500 ease-editorial group-hover:w-6" />
                    </span>
                    <span className="display text-3xl md:text-4xl group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <FiArrowUpRight className="ml-auto w-5 h-5 text-sand-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-editorial" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
