import Banner from "./Slider";
import AboutUs from "./About section/AboutUs";
import OurProfile from "./OurProfile";
import Portfolio from "./Portfolio";
import CraftProcess from "./CraftProcess";
import WhyChooseUs from "./WhyChooseUs";
import ExportSection from "./ExportSection";
import ErrorBoundary from "./ErrorBoundaries";

const Home = () => {
  return (
    <div className="relative">
      <ErrorBoundary>
        <Banner />
        <AboutUs />
        <OurProfile />
        <Portfolio />
        <CraftProcess />
        <WhyChooseUs />
        <ExportSection />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
