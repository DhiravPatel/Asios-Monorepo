import React, { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SkeletonLoader from '../../SkeletonLoader';
import { AppContext } from '../../AppContext';

const Main_Product_details = () => {
  const { categoryId } = useParams();
  const { categories, subcategories } = useContext(AppContext);

  const category = useMemo(
    () => (categories || []).find((c) => c._id === categoryId),
    [categories, categoryId]
  );

  const filteredSubcategories = useMemo(
    () =>
      (subcategories || []).filter((sub) => {
        const subCatId = sub.category?._id || sub.category;
        return String(subCatId) === String(categoryId);
      }),
    [subcategories, categoryId]
  );

  const categoryName = category?.category || '';

  return (
    <div className=''>
      <div className='flex gap-2 justify-start my-6 font-normal pl-20 py-10 bg-gray'>
        <div>
          <Link to={"/"}>Home</Link> <span> {">"}</span>
        </div>
        <div>
          <Link to={"/product"}>Product</Link> <span>{">"}</span>
        </div>
        <div>
          <Link>{categoryName}</Link>
        </div>
      </div>
      <div className='my-2 mt-10 container'>
        <div>
          <div className='md:mt-10 mt-5 mb-10'>
            <span className='md:font-bold font-semibold md:text-xl'>Products</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3'>
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((sub) => (
                  <div className='mt-10 relative flex justify-center flex-col items-center cursor-pointer' key={sub._id}>
                    <Link to={`/product/${categoryId}/${sub._id}`}>
                      <img src={sub.image || 'fallback-image.jpg'} alt={sub.subcategory} className='sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] w-[350px] h-[350px] object-cover hover:opacity-90' />
                      <div className='mt-1 font-medium text-lg uppercase hover:underline hover:transition-all hover:duration-300 text-center '>
                        {sub.subcategory}
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
  );
}

export default Main_Product_details;
