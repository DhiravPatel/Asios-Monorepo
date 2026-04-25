import React, { useEffect, useRef, useState } from 'react';
import service1 from '../assets/office-building.png';
import service2 from '../assets/logistics.png';
import service3 from '../assets/construction-site.png';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const servicesList = [
    {
        head: 'Company Profile',
        para: 'Headquartered in Morbi (Ceramic Capital of India), Asios global has always stood out from the crowd. It emerged with the objective of creating a material category suitable for interior and exterior construction.',
        icon: service1,
    },
    {
        head: 'Infrastructure',
        para: 'The strength and success of Asios global lies in its sound infrastructure which has advanced manufacturing facilities that comprises of latest machinery and advent-grade technologies.',
        icon: service3,
    },
    {
        head: 'Export Coverage',
        para: 'High performance levels and refined aesthetic quality, have made Asios global products greatly acknowledged by numerous industry experts in the international panorama.',
        icon: service2,
    },
];

const OurProfile = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e, index) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        setMousePosition({ x, y });
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                setIsInView(rect.top <= windowHeight && rect.bottom >= 0);
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className='py-20 bg-gray'>
            <div className='container' ref={ref}>
                <motion.div
                    variants={textVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.8, ease: 'easeIn' }}
                >
                    <div className='font-bold md:text-4xl sm:text-2xl text-xl text-center flex flex-col justify-center'>
                        Our Profile
                    </div>
                </motion.div>
                <div className='md:pt-10 sm:pt-8 pt-5'>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3'>
                        {servicesList.map((item, i) => {
                            const { head, para, icon } = item;
                            const isHovered = hoveredIndex === i;

                            return (
                                <div
                                    key={i}
                                    className='service-item relative'
                                    onMouseMove={(e) => handleMouseMove(e, i)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div
                                        className='group border border-gray bg-white px-5 py-5 rounded-2xl md:h-[400px] sm:h-[340px] h-[400px] flex flex-col justify-between hover:shadow-lg relative overflow-hidden'
                                        style={{
                                            transform: isHovered ? `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)` : 'none',
                                        }}
                                    >
                                        <div className='xl:text-xl lg:text-lg md:text-base text-sm font-semibold px-3 py-2 bg-white group-hover:text-white group-hover:bg-primary rounded-lg w-fit z-90 relative'>
                                            {head}
                                        </div>
                                        <div className={`z-90 relative ${isHovered ? '-translate-y-7' : 'translate-y-16'} transition-transform duration-700`}>
                                            <div className='sm:text-base text-sm'>{para}</div>
                                        </div>
                                        <div className='sm:p-3 p-2 bg-primary rounded-full w-fit mt-4'>
                                            <FiArrowUpRight className='sm:w-7 sm:h-7 w-5 h-5 text-white' />
                                        </div>
                                        <div className='absolute bottom-4 right-4 z-10'>
                                            <img
                                                src={icon}
                                                alt={head}
                                                width={150}
                                                height={150}
                                                className={`object-cover w-[150px] h-[150px] ${isHovered ? 'translate-x-0' : 'translate-x-[120%]'} transition-transform duration-700 md:w-[150px] md:h-[150px] !w-[120px] !h-[120px]`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurProfile;
