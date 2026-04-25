import { Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import AboutUS from './AboutUS/AboutUS';
import ContactUS from './ContactUS/ContactUS';
import Product from './Product/Product';
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main_Product_details from "./Product/Product-Detail/Main_Product_Details";
import Second_product_details from "./Product/Product-Detail/Second_product_details";
import Product_details from "./Product/Product-Detail/Product_details";
import Catelogue from "./Catalogue/Catelogue";
import { AppProvider } from "./AppContext";
import Export from "./Export/Export";
import TilesCalculator from "./Information/TilesCalculator";
import PackingInfo from "./Information/PackingInfo";
import QualityAssurance from "./Information/QualityAssurance";
import SampleRequest from "./Information/SampleRequest";
import Customization from "./Information/Customization";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./NotFound";
import Blog from "./Blog/Blog";
import BlogDetail from "./Blog/BlogDetail";

// const DisableRightClickAndShortcuts = () => {
//   React.useEffect(() => {
//     const handleRightClick = (event) => {
//       event.preventDefault();
//     };

//     // Disable F12 key
//     const handleF12 = (event) => {
//       if (event.key === 'F12') {
//         event.preventDefault();
//       }
//     };

//     const handleCtrlShiftI = (event) => {
//       if (event.ctrlKey && event.shiftKey && event.key === 'I') {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('contextmenu', handleRightClick);
//     window.addEventListener('keydown', handleF12); 
//     window.addEventListener('keydown', handleCtrlShiftI); 

//     return () => {
//       window.removeEventListener('contextmenu', handleRightClick);
//       window.removeEventListener('keydown', handleF12);
//       window.removeEventListener('keydown', handleCtrlShiftI);
//     };
//   }, []);

//   return null; 
// };



function App() {
  return (
    <AppProvider>
      <React.Fragment>
        {/* <DisableRightClickAndShortcuts /> */}
        <ScrollToTop>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/product" element={<Product />} />
          <Route path="/catalogue" element={<Catelogue />} />
          <Route path="/main-product/:category" element={<Main_Product_details />} />
          <Route path="/product/:category/:subcategory" element={<Product_details />} />
          <Route path="/product-detail/:_id" element={<Second_product_details />} />
          <Route path="/export" element={<Export />} />
          <Route path="/tiles-calculator" element={<TilesCalculator />} />
          <Route path="/packing-details" element={<PackingInfo />} />
          <Route path="/quality-assurance" element={<QualityAssurance />} />
          <Route path="/sample-request" element={<SampleRequest />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </ScrollToTop>
      </React.Fragment>
    </AppProvider>
  );
}

export default App;
