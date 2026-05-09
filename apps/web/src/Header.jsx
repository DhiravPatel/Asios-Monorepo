import React, { useState, useEffect, useContext } from "react";
import logo from "../src/assets/asios_logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { AppContext } from "./AppContext";

const informationLinks = [
  { to: "/tiles-calculator", label: "Tiles Calculator" },
  { to: "/packing-details", label: "Packing Details" },
  { to: "/quality-assurance", label: "Quality Assurance" },
  { to: "/sample-request", label: "Sample Request" },
  { to: "/customization", label: "Customization" },
  { to: "/blog", label: "Blog" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { footerData } = useContext(AppContext);
  const categories = footerData || [];
  const location = useLocation();

  // close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // scrolled state for subtle shadow + bg lock
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative inline-flex items-center text-[12px] font-medium tracking-[0.22em] uppercase text-ink/80 hover:text-ink transition-colors duration-300 ${
      isActive ? "text-ink" : ""
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      } border-b border-sand-200/60`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="Asios home">
          <img src={logo} alt="Asios" className="h-9 md:h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9 xl:gap-11">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>

          {/* Products mega-menu */}
          <div className="relative group">
            <NavLink to="/product" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5">
                Products
                <FiChevronDown className="w-3 h-3 mt-px opacity-70 transition-transform duration-300 group-hover:rotate-180" />
              </span>
            </NavLink>
            <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-editorial absolute left-1/2 -translate-x-1/2 top-full pt-5">
              <div className="min-w-[260px] bg-white shadow-lift border border-sand-200/70">
                <div className="px-6 pt-5 pb-3">
                  <span className="eyebrow !text-[10px]">Collections</span>
                </div>
                <div className="pb-3">
                  {categories.length > 0 ? (
                    categories.map((item) => (
                      <Link
                        key={item._id}
                        to={`/main-product/${item._id}`}
                        className="group/item flex items-center justify-between px-6 py-2.5 text-[13px] text-ink/85 hover:text-primary hover:bg-cream transition-colors"
                      >
                        <span className="capitalize">{item.category}</span>
                        <span className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">→</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-2.5 text-[13px] text-sand-400">Loading…</div>
                  )}
                </div>
                <div className="border-t border-sand-200/70 px-6 py-3">
                  <Link to="/product" className="text-[11px] tracking-[0.22em] uppercase font-semibold text-primary hover:text-primary-dark">
                    View all →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Information dropdown */}
          <div className="relative group">
            <button type="button" className={`${navLinkClass({ isActive: false })} cursor-default`}>
              <span className="inline-flex items-center gap-1.5">
                Information
                <FiChevronDown className="w-3 h-3 mt-px opacity-70 transition-transform duration-300 group-hover:rotate-180" />
              </span>
            </button>
            <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-editorial absolute left-1/2 -translate-x-1/2 top-full pt-5">
              <div className="min-w-[230px] bg-white shadow-lift border border-sand-200/70 py-3">
                {informationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-6 py-2.5 text-[13px] text-ink/85 hover:text-primary hover:bg-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/export" className={navLinkClass}>Export</NavLink>
          <NavLink to="/catalogue" className={navLinkClass}>E-Catalogue</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="lg:hidden p-2 -mr-2 text-ink"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-16 md:top-20 bg-white transition-transform duration-500 ease-editorial ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="h-full overflow-y-auto px-6 py-8">
          <nav className="flex flex-col">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/product", label: "Products" },
              { to: "/export", label: "Export" },
              { to: "/catalogue", label: "E-Catalogue" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="display text-3xl py-3 border-b border-sand-200 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-8">
              <span className="eyebrow">Information</span>
              <div className="mt-4 flex flex-col gap-3">
                {informationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-[14px] text-ink/85 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {categories.length > 0 && (
              <div className="mt-8">
                <span className="eyebrow">Collections</span>
                <div className="mt-4 flex flex-col gap-3">
                  {categories.map((item) => (
                    <Link
                      key={item._id}
                      to={`/main-product/${item._id}`}
                      onClick={() => setIsOpen(false)}
                      className="capitalize text-[14px] text-ink/85 hover:text-primary transition-colors"
                    >
                      {item.category}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
