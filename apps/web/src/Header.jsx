import React, { useState, useRef, useContext } from "react";
import logo from "../src/assets/asios_logo.svg";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";
import { AppContext } from "./AppContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const { footerData } = useContext(AppContext);
  const data = footerData;
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);    
  };

  React.useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        display: "block"
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          menuRef.current.style.display = "none";
        }
      });
    }
  }, [isOpen]);


  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex md:justify-between  justify-between items-center py-2.5 pl-[60px] md:pr-[100px] lg:pr-[100px] pr-[60px] bg-white shadow-md sticky top-0 z-10">
      <div>
        <Link to="/">
          <img src={logo} className="w-auto h-12 object-cover" alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:flex gap-4 sm:gap-6">
        <Link to="/" className=" hover:text-primary">
          Home
        </Link>
        <Link to="/about" className=" hover:text-primary">
          About
        </Link>
        <div className="relative group">
          <Link to="/product" className=" hover:text-primary">
            Products
          </Link>
          <div className="absolute left-0 w-48 space-y-2 pt-[25px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <Link
                  to={`/main-product/${item.category}`}
                  key={item._id}
                  className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
                >
                  {item.category}
                </Link>
              ))}
          </div>
        </div>

        <div className="relative group">
          <button className="hover:text-primary">Information</button>
          <div className="absolute left-0 w-48 space-y-2 pt-[25px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <Link
              to="/tiles-calculator"
              className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
            >
              Tiles Calculator
            </Link>
            <Link
              to="/packing-details"
              className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
            >
              Packing Details
            </Link>
            <Link
              to="/quality-assurance"
              className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
            >
            Quality Assurance
            </Link>
            <Link
              to="/sample-request"
              className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
            >
             Sample Request
            </Link>
            <Link
              to="/customization"
              className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square"
            >
             Customization
            </Link>
            <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:text-primary list-inside list-square">
             Blog
            </Link>
          </div>
        </div>
        <Link to="/export" className=" hover:text-primary">
          Export
        </Link>
        <Link to="/catalogue" className=" hover:text-primary">
          E-Catalogue
        </Link>
        <Link to="/contact" className=" hover:text-primary">
          Contact
        </Link>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`fixed top-16 right-0 h-full w-full bg-white  md:hidden transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ display: "none" }}
      >
        <nav className="flex flex-col items-center py-4">
          <Link
            to="/"
            className=" hover:text-primary py-2"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className=" hover:text-primary py-2"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/product"
            className=" hover:text-primary py-2"
            onClick={toggleMenu}
          >
            Products
          </Link>
         
          
          <Link
            to="/export"
            className=" hover:text-primary py-2 onClick={toggleMenu}"
            onClick={toggleMenu}
          >
            Export
          </Link>
          <Link
            to="/catalogue"
            className=" hover:text-primary py-2 onClick={toggleMenu}"
            onClick={toggleMenu}
          >
            E-Catalogue
          </Link>
          <Link
            to="/contact"
            className=" hover:text-primary py-2"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          {/* <Link
        to="/"
        className="hover:text-primary py-2"
        onClick={toggleDropdown} 
      >
        Information
      </Link>
      {isDropdownOpen && (
        <div className=" bg-white shadow-lg mt-2 py-2 w-48 rounded-lg">
          <Link to="/tiles-calculator" onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-100">Tiles Calculator</Link>
          <Link to="/packing-details" onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-100">Packing Details</Link>
          <Link to="/quality-assurance" onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-100">Quality Assurance</Link>
          <Link to="/sample-request" onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-100">Sample Request</Link>
          <Link to="/customization" onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-100">Customization</Link>
        </div>
      )} */}
        </nav>
      </div>
    </div>
  );
};

export default Header;
