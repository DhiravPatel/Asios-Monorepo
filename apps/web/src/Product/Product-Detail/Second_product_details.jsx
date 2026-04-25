import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import InquiryModal from "./InquiryModal";
import ImgsViewer from "react-images-viewer";
import SkeletonLoader from "../../SkeletonLoader";
import { useGetProductById } from "../../hooks/Product/ProductHook";

const Second_product_details = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product;
  // Only fetch when we don't already have the product (e.g. direct URL / refresh).
  const { data: fetchedProduct } = useGetProductById(productFromState ? null : _id);
  const product = productFromState || fetchedProduct;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);

  const productDetails = useMemo(() => {
    if (!product?.details) return {};
    if (typeof product.details === 'string') {
      try { return JSON.parse(product.details); } catch { return {}; }
    }
    return product.details;
  }, [product]);

  const categoryName = product?.category?.category || '';
  const subcategoryName = product?.subcategory?.subcategory || '';
  const categoryId = product?.category?._id;

  const isFramedImage = useMemo(() => {
    if (!product) return false;
    return (
      (categoryName === "Tiles" && subcategoryName !== "Wooden Strip Tiles" && subcategoryName !== "Subway Tiles" && subcategoryName !== "Elevation Wall Tiles") ||
      (categoryName === "Decorative Wall & Ceiling Panel" && subcategoryName === "Soffit Ceiling Panel") ||
      categoryName === "Quartz Slab" ||
      categoryName === "Other Products"
    );
  }, [product, categoryName, subcategoryName]);

  const handleView = (pdfLink) => {
    window.open(pdfLink, "_blank");
  };

  const GoBack = () => {
    navigate(-1);
  };

  const openImageViewer = () => {
    setViewerIsOpen(true);
    setCurrImg(0);
  };

  const closeViewer = () => {
    setViewerIsOpen(false);
  };

  const gotoPrevious = () => {
    setCurrImg((prev) => (prev - 1 + 1) % 1);
  };

  const gotoNext = () => {
    setCurrImg((prev) => (prev + 1) % 1);
  };

  return (
    <>
      <div className="flex gap-2 justify-start my-6 font-normal md:pl-20 pl-10 py-10 bg-gray flex-wrap">
        <div>
          <Link to={"/"}>Home</Link> <span> {">"}</span>
        </div>
        <div>
          <Link to={"/product"}>Product</Link> <span>{">"}</span>
        </div>
        <div className="capitalize">
          <Link to={categoryId ? `/main-product/${categoryId}` : '#'}>
            {categoryName || "Loading..."}
          </Link>
          <span>{">"}</span>
        </div>
        <div className="capitalize" onClick={GoBack}>
          <Link>{subcategoryName || "Loading..."}</Link>
          <span>{">"}</span>
        </div>
        <div className="capitalize">
          <Link>{product ? product.productName : "Loading..."}</Link>
        </div>
      </div>
      <div className="container">
        <div className="md:pt-[40px] pb-[25px] mb-[50px]">
          <div className="flex md:flex-row flex-col md:gap-20 gap-5 items-start">
            <div className="flex flex-col">
              {product ? (
                <img
                  src={product.image}
                  alt={product.productName}
                  className={`h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] cursor-pointer ${
                    isFramedImage ? "border-[#dfdfdf] border object-cover" : "object-contain"
                  }`}
                  onClick={openImageViewer}
                />
              ) : (
                <SkeletonLoader width="300px" height="300px" />
              )}
            </div>
            <div className="float-left">
              <>
                <span className="uppercase font-bold text-lg">
                  {product ? product.productName : " "}
                </span>

                <table className="table-auto w-full my-4 overflow-x-auto">
                  <tbody>
                    {product && (
                      <>
                        {productDetails.size && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              SIZE
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.size}
                            </td>
                          </tr>
                        )}
                        {productDetails.thickness && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              THICKNESS
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.thickness}
                            </td>
                          </tr>
                        )}
                        {productDetails.surface && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              SURFACE
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.surface}
                            </td>
                          </tr>
                        )}
                        {productDetails.model && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              MODEL
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.model}
                            </td>
                          </tr>
                        )}
                        {productDetails.grade && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              GRADE
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.grade}
                            </td>
                          </tr>
                        )}
                        {productDetails.packing && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              PACKING
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.packing}
                            </td>
                          </tr>
                        )}
                        {productDetails.weight && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              WEIGHT
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.weight}
                            </td>
                          </tr>
                        )}
                        {productDetails.application && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              APPLICATION
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.application}
                            </td>
                          </tr>
                        )}
                        {productDetails.type && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              TYPE
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.type}
                            </td>
                          </tr>
                        )}
                        {productDetails.color && (
                          <tr className="tableborder">
                            <th className="bodyh1 w-1/4 px-2 py-1 text-left">
                              COLOR
                            </th>
                            <td className="bodyh2 w-3/4 px-2 py-1 text-left">
                              |&nbsp;{productDetails.color}
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>

                <div className="flex flex-row md:gap-5 gap-3 gap-x-2 flex-1 flex-wrap">
                  {productDetails.link && (
                    <div
                      className="btn"
                      onClick={() => handleView(productDetails.link)}
                    >
                      View Brochure
                    </div>
                  )}
                  <Link to={"/contact"}>
                    <div className="btn">Contact Us</div>
                  </Link>
                  <div className="btn" onClick={() => setIsModalOpen(true)}>
                    Product Inquiry
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product ? product.productName : ""}
      />

      <ImgsViewer
        imgs={[{ src: product ? product.image : "" }]}
        currImg={currImg}
        isOpen={viewerIsOpen}
        onClickPrev={gotoPrevious}
        onClickNext={gotoNext}
        onClose={closeViewer}
      />
    </>
  );
};

export default Second_product_details;
