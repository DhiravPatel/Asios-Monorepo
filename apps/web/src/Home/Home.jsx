import React from 'react';
import Banner from './Slider'
import WhyChooseUs from './WhyChooseUs';
import Portfolio from './Portfolio';
import ErrorBoundary from './ErrorBoundaries';
import OurProfile from './OurProfile';
import AboutUs from './About section/AboutUs';
import Cerification from '../AboutUS/Cerification';
import GlobalFootprint from '../AboutUS/GlobalFootprint';
import ExportSection from './ExportSection';
const Home = () => {
    return (
        <div className='relative'>
            <ErrorBoundary>
            <Banner />
            <div>
            <AboutUs/>
            <OurProfile />
            <Portfolio />
            <WhyChooseUs />
            {/* <Cerification /> */}
            {/* <GlobalFootprint /> */}
            <ExportSection />
            </div>
            </ErrorBoundary>
        </div>
    )
}

export default Home;
