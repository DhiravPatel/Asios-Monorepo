import React, { useState, useEffect, useMemo } from "react";
import { FaChevronDown, FaBook } from "react-icons/fa";
import { useGetAllCatalogueCategory } from "../hooks/Catalogue/CatalogueCategoryHook";
import { useGetAllCatalogueSubCategory } from "../hooks/Catalogue/CatalogueSubCategoryHook";

const Category = ({ onSelectSubcategory }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const { data: catalogueCategoryData } = useGetAllCatalogueCategory();
  const { data: catalogueSubCategoryData } = useGetAllCatalogueSubCategory();

  const catalogueCategories = useMemo(() => {
    return (catalogueCategoryData || []).map((category) => ({
      ...category,
      submenu: (catalogueSubCategoryData || [])
        .filter((sub) => sub.cataloguecategory === category.cataloguecategory)
        .map((sub) => sub.cataloguesubcategory),
    }));
  }, [catalogueCategoryData, catalogueSubCategoryData]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCheckboxChange = (subcategory) => {
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.includes(subcategory)) {
        return prevSelected.filter((item) => item !== subcategory);
      } else {
        return [...prevSelected, subcategory];
      }
    });
  };

  useEffect(() => {
    onSelectSubcategory(selectedSubcategories);  // Pass the selected subcategories to parent component
  }, [selectedSubcategories, onSelectSubcategory]);

  return (
    <div className="lg:w-[300px] md:w-[250px] w-full mx-auto sticky top-32">
      {catalogueCategories.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div
            className={`flex justify-between items-center p-3 cursor-pointer ${
              openIndex === index ? "bg-[#a42832] text-white" : "bg-[#F5F5F5] text-[#333333]"
            }`}
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index ? "true" : "false"}
          >
            <div className="flex items-center">
              <FaBook className="mr-2" />
              <div className="text-lg font-semibold">{item.cataloguecategory}</div>
            </div>
            <FaChevronDown
              className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
              style={{ color: openIndex === index ? "#FFFFFF" : "#888888" }}
            />
          </div>
          {openIndex === index && (
            <ul
              className="pl-20 cursor-pointer py-2 space-y-1 w-full bg-[#FFF8E1] text-[#333333]"
            >
              {item.submenu.map((subitem, subIndex) => (
                <div key={subIndex} className="flex gap-2 items-center">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    id={subitem}
                    value={subitem}
                    checked={selectedSubcategories.includes(subitem)}
                    onChange={() => handleCheckboxChange(subitem)}
                    className="cursor-pointer"
                  />
                  <label htmlFor={subitem} className="text-sm hover:text-primary transition-colors delay-100">
                    {subitem}
                  </label>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
