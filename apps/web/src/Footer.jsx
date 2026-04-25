import React, { useContext } from 'react'
import logo from '../src/assets/asios_logo.svg'
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AppContext } from './AppContext';
const Footer = () => {

  const { footerData } = useContext(AppContext);
  const data = footerData
  return (
    <div className='md:px-20  px-8 py-12 bg-black text-white '>
      <div className='flex justify-between  items-start gap-5 sm:gap-3 sm:flex-row  flex-wrap'>
        <div>
          <div className='w-[200px] flex flex-col gap-3'>
            <img src={logo} alt="" className=' sm:w-[150px] w-[100px] h-auto ' />
            <span className='sm:text-sm text-xs text-white'>We provides a full range of interior design, architectural design.</span>
            <div className='flex gap-2'>
            <Link to="https://www.facebook.com/asiosglobal?mibextid=ZbWKwL" target="_blank" >  <FaFacebook className='w-auto h-[25px] text-white hover:text-blue' /></Link> 
           <Link to="https://www.linkedin.com/company/asios-global/" target="_blank"> <FaLinkedin className='w-auto h-[25px] text-white hover:text-blue' /></Link>   
         <Link to="https://www.youtube.com/@asiosglobal?si=u7CNidRQInNnPMWS" target="_blank"> <FaYoutube className='w-auto h-[25px] text-white hover:text-blue' /></Link>     
            </div>
          </div>
        </div>
        <div className=' flex flex-col gap-3'>
          <div className='font-[600] text-xl'>Quick Link</div>
          <div className='flex flex-col gap-2 items-start text-white '>
            <Link to="/" className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300">Home</Link>
            <Link to="/product" className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300">Products</Link>
            <Link to="/catalogue" className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300">E-catalogue</Link>
            <Link to="/about" className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300">About Us</Link>
            <Link to="/contact" className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300">Contact Us</Link>
          </div>
        </div>

        <div className=' flex flex-col gap-3 lg:ml-6 md:ml-4'>
          <div className='font-[600] text-xl'>Information</div>
          <div className='flex flex-col gap-2 items-start text-white '>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/tiles-calculator'>Tiles Calculator</Link>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/packing-details'>Packing Details</Link>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/quality-assurance'>Quality Assurance</Link>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/sample-request'>Sample Request</Link>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/customization'>Customization</Link>
          <Link className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300" to='/blog'>Blog</Link>
          </div>
        </div>
        <div className=' flex flex-col gap-3 lg:ml-6 md:ml-4'>
          <div className='font-[600] text-xl'>Products</div>
          <div className='flex flex-col gap-2 items-start text-white '>
          {data && data.length > 0 && (
              data.map((item) => (
                <Link
                  to={`/main-product/${item._id}`}
                  key={item._id}
                  className="'sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300"
                >
                  {item.category}
                </Link>
              ))
            )}
          </div>
        </div>

        <div className=' flex flex-col gap-3'>
          <div className='font-[600] text-xl'>Our Address</div>
          <div className='flex gap-2 items-start'>
    <IoLocationSharp className='w-auto sm:h-[25px] h-[20px] text-white' />
    <a
        href="https://www.google.com/maps/place/ASIOS+GLOBAL/@22.8141528,70.8669576,17z/data=!3m1!4b1!4m6!3m5!1s0x39598df7d1a60d67:0x24006f9a055d9da2!8m2!3d22.8141528!4d70.8695325!16s%2Fg%2F11pzvtscyp?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className='sm:w-[300px] w-full sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300'
    >
        Latest Ceramic Zone, 1st Floor, B/H Ishan Ceramic Zone 8-A, National Highway, Morbi, Gujarat 363642
    </a>
</div>
        </div>
        <div className=' flex flex-col gap-3'>
          <div className='font-[600] text-xl w-fit'>Reach Us</div>
          <div className='flex items-start w-fit'>
            <span className='sm:text-sm text-xs text-white mr-[20px]'>Email :</span>
            <Link to="mailto:info@asios.in" className='w-fit sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300'> info@asios.in</Link>
          </div>
          <div className="flex gap-2 w-fit">
            <div className="sm:text-sm text-xs text-white">
             Phone :
            </div>
            <div className="flex flex-col">
              <Link to='tel:9409000751' className='w-fit sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300'><span>+91 9409000751 (Export)</span></Link>
              <Link to='tel:9327624243' className='w-fit sm:text-sm text-xs text-white hover:text-[#A42832] transition-colors duration-300' style={{lineHeight:'2.5'}}><span>+91 9327624243 (Domestic)</span></Link>
            </div>
          </div>  

        </div>
      </div>
      <div className=' mt-5 border-t-[1px] border-gray'>
      <span className='sm:w-[300px] w-full sm:text-sm text-xs text-white'>@2025 Asios Global. All Rights Reserved </span>
      </div>
    </div>
  )
}

export default Footer