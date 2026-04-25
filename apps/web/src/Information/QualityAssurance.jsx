import React from "react";
import { motion } from "framer-motion";
import productInspection from "../assets/duproductionInspection.jpg";
import sampleMatching from "../assets/sampleMatching.jpg";
import preShipment from "../assets/preShipment.jpg";
import sampleReport from "../assets/SampleReportIMG.jpg";
import QcCover from "../assets/qc.webp";
import loading from "../assets/loading.png";
import { FaDownload, FaEye } from "react-icons/fa";

const QualityAssurance = () => {
  const handleDownload = (googleDriveLink) => {
    const fileIdMatch = googleDriveLink.match(/[-\w]{25,}/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[0];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = ""; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Invalid Google Drive URL");
    }
  };

  const handleView = (pdfLink) => {
    window.open(pdfLink, "_blank");
  };

  return (
    <>
      <div className="relative h-[600px]">
        <img
          src={QcCover}
          className="h-full w-full object-cover"
          alt="Contact Banner"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold text-center">
            Quality Assurance
          </h1>
        </motion.div>
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-center bg-white">
  {/* Image section: Will appear second on mobile (default) but first on large screens */}
  <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
    <img
      src={sampleMatching}
      alt="Sample Matching"
      className="object-cover w-full h-full lg:h-[500px] mt-2 lg:mt-0"
    />
  </div>
  
  {/* Description section: Will appear first on mobile (default) but second on large screens */}
  <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start order-1 lg:order-2">
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
      Pre Production Inspection
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6 text-justify">
      IT'S A MATTER OF TRUST, So Asios will inspect raw materials and
      components before final production begins with inputs provided by
      customer. After tiles samples are provided, we will verify that the
      factory has ordered the correct materials, components, and
      accessories. We will also randomly select and inspect a sample of
      partially produced tile boxes for potential defects such as:
      Technical Standards, Dimension and Physical Properties, Surface
      Flatness (Planarity), Thickness, Length and Wide (Size),
      Straightness of Sides, Surface Quality, Water Absorption Breaking
      Strength And Modulus Of Rupture, Chemical Resistance, Stain
      Resistance, Thermal Shock, Deep Abrasion Resistance, Crazing
      Resistance, Frost Resistance, Glossiness And Texture Packaging
      Specifications like Bar Code Label Standard, Wood Pallet Standard
      Dimension, Pallet Wrapping Standard, Loading Instruction and Some
      Details Need Lab Testing Then report our findings to you. If
      necessary, we can provide the factory with the technical advice
      necessary to improve tiles quality and to minimize the chance of
      defects during production.
    </p>
  </div>
</section>




      <section className="flex flex-col lg:flex-row items-center justify-center bg-white">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            During Production Inspection
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
            During Production Inspections are ideal for shipments of substantial
            quantities product lines with continuous production, strict
            requirements for on-time shipments and as a follow up if poor
            results were found during Pre Production Inspection. Normally,
            During Production Inspections are carried out when 12-15% of the
            merchandise is completed. Asios will inspect the production batch
            and examine tiles in the line for possible defects. At this point we
            will identify deviations, if any, and offer advice on corrective
            measures that will ensure uniformity of tiles and quality. We will
            also re-check any defects discovered during Pre-Production
            Inspection and confirm that they have been rectified.
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <img
            src={productInspection}
            alt="Product Inspection"
            className="object-cover w-full h-full mt-2 lg:mt-0"
          />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-center justify-center bg-white">
        <div className="w-full lg:w-1/2 relative order-2 lg:order-1 lg:pl-[60px]">
          <img
            src={preShipment}
            alt="Pre Shipment"
            className="object-cover w-full lg:w-[650px] h-full mt-2 lg:mt-0"
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start order-1 lg:order-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Pre Shipment Inspection
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
            Pre Shipment called Final Random Inspections can begin only after
            production has been completed and all production is ready and packed
            for shipment. Through a statistical method set by industry
            standards, we will sample products to verify product safety,
            quantity, workmanship, function, color, size, packing, and more.
            This ensures that your product is consistent and compliant with all
            country, industry, or otherwise specified requirements and that no
            critical major or minor defects appear.
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-center justify-center bg-white mt-4">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Loading Supervision
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
            During Loading Supervision, an Asios representative will closely
            monitor the loading process, verify product quantity, and ensure
            proper handling of the cargo and its quality. Upon completion, the
            containers will be sealed with Asios tape as proof of compliance.
            This service significantly reduces the risk associated with
            importing cargo.
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative lg:ml-[70px]">
          <img
            src={loading}
            alt="Loading Supervision"
            className="w-full lg:w-[650px] h-[400px] mt-2 mb-4 lg:mt-0"
          />
        </div>
      </section>

      <div className="flex justify-center">
        <div className="flex md:flex-row py-14">
          <div className="flex-1 flex flex-col container md:p-0">
            <div className="md:p-4"></div>
            <div className="md:p-4 justify-items-center">
              <div className="relative group mb-4 overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-2xl w-full md:w-[215px]">
                <img
                  src={sampleReport}
                  className="w-full h-[300px] object-cover transition-transform duration-300 transform group-hover:scale-110"
                  alt="Sample Report"
                />
                <div
                  onClick={() =>
                    handleView(
                      "https://drive.google.com/file/d/1si5KQ6FUDnDFRc6T349qVGRt34g8W5yI/view?usp=drive_link"
                    )
                  }
                  className="absolute top-2 cursor-pointer right-2 bg-white bg-opacity-75 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FaEye />
                </div>
                <div className="flex justify-between items-center mt-2 p-3">
                  <h5 className="font-semibold text-lg">
                    Sample Quality Report
                  </h5>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleDownload(
                        "https://drive.google.com/file/d/1si5KQ6FUDnDFRc6T349qVGRt34g8W5yI/view?usp=drive_link"
                      )
                    }
                  >
                    <FaDownload />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityAssurance;
