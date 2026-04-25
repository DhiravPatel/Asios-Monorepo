import React from "react";
import { Link, useParams } from "react-router-dom";
import SkeletonLoader from "../../SkeletonLoader";
import { useGetProductBySubCategory } from "../../hooks/Product/ProductHook";

const Product_details = () => {
  const { subcategory, category } = useParams();
  const { data: products } = useGetProductBySubCategory(subcategory);

  return (
    <>
      <div className="flex gap-2 justify-start my-6 font-normal md:pl-20 pl-10 py-10 bg-gray flex-wrap">
        <div>
          <Link to={"/"}>Home</Link> <span> {">"}</span>
        </div>
        <div>
          <Link to={"/product"}>Product</Link> <span>{">"}</span>
        </div>
        <div>
          <Link to={`/main-product/${category}`}>{category}</Link> <span>{">"}</span>
        </div>
        <div>
          <Link>{subcategory}</Link>
        </div>
      </div>
      <div className="container">
        <div className="my-2 mt-10">
          <div>
            <div className="md:mt-10 mt-5 mb-10">
              <span className="md:font-bold font-semibold md:text-xl">
                Products
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      className="mt-10 relative flex justify-center flex-col items-center cursor-pointer"
                      key={product._id}
                    >
                      <Link to={`/product-detail/${product._id}`}>
                        <img
                          src={product.image || "fallback-image.jpg"}
                          className={`sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] w-[350px] h-[350px] hover:opacity-90
                            ${
                              (product?.category === "Tiles" && (product.subcategory != "Wooden Strip Tiles") && (product.subcategory != "Subway Tiles") && (product.subcategory != "Elevation Wall Tiles")) 
                              || (product.category === "Decorative Wall & Ceiling Panel" && (product.subcategory === "Soffit Ceiling Panel")) 
                              || product.category === "Quartz Slab" 
                              ||(product.category === "Other Products" && !product.subcategory === 'ROOFING SHEET')
          
                                ? "border-[#dfdfdf] border object-cover"
          
                                : "object-contain"
                            }
                            `}
                          style={{width:'550px'}}
                        />
                        <div className="mt-1 font-medium text-lg uppercase hover:underline hover:transition-all hover:duration-300 text-center">
                          {product.productName}
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div
                      className="relative group overflow-hidden cursor-pointer"
                      key={index}
                    >
                      <SkeletonLoader width="350px" height="350px" />
                      <div className="absolute bottom-0 w-full text-center bg-[#232323] text-white p-2 transform translate-y-full transition-transform duration-300">
                        <SkeletonLoader width="100px" height="20px" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_details;
