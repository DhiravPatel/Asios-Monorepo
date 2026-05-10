import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import service1 from '../assets/office-building.png';
import service2 from '../assets/logistics.png';
import service3 from '../assets/construction-site.png';

const services = [
    {
        index: '01',
        head: 'Company Profile',
        para: 'Headquartered in Morbi (the Ceramic Capital of India), Asios Global was built to create a category of materials suited to thoughtful interior and exterior construction.',
        icon: service1,
    },
    {
        index: '02',
        head: 'Infrastructure',
        para: 'Our strength lies in a sound, modern infrastructure — manufacturing facilities equipped with the latest machinery and advent-grade technologies.',
        icon: service3,
    },
    {
        index: '03',
        head: 'Export Coverage',
        para: 'High performance and refined aesthetics have made our products widely acknowledged by industry experts across the international panorama.',
        icon: service2,
    },
];

const OurProfile = () => {
    return (
        <section className="section bg-ink text-white relative overflow-hidden">
            {/* ambient red glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <span className="rule rule-light !w-10" />
                            <span className="eyebrow eyebrow-light !text-white">Our Profile</span>
                        </div>
                        <h2 className="display !text-white text-4xl md:text-5xl lg:text-[56px] max-w-2xl">
                            Founded on craft. <br />
                            <span className="display-italic text-primary">Driven by reach.</span>
                        </h2>
                    </div>
                    <p className="text-[15px] text-white/65 leading-[1.8] max-w-md">
                        Three pillars define how Asios operates — from the foundry floor in Morbi
                        to ports across fifty markets.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
                    {services.map((item, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-white/[0.03] p-8 lg:p-10 border border-white/10 hover:border-primary hover:bg-white/[0.05] transition-all duration-500 ease-editorial flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <span className="display !text-white/30 text-2xl tracking-wider group-hover:!text-primary transition-colors duration-500">
                                    {item.index}
                                </span>
                                <img
                                    src={item.icon}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-14 h-14 object-contain opacity-60 group-hover:opacity-90 transition-opacity brightness-0 invert"
                                />
                            </div>

                            <h3 className="display !text-white text-3xl md:text-[34px] mb-4 leading-[1.1]">
                                {item.head}
                            </h3>
                            <p className="text-[14.5px] text-white/65 leading-[1.75] flex-1">
                                {item.para}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-white">
                                <span>Learn more</span>
                                <FiArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-0.5 text-primary" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProfile;
