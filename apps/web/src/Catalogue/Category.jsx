import React, { useState, useEffect, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useGetAllCatalogueCategory } from "../hooks/Catalogue/CatalogueCategoryHook";
import { useGetAllCatalogueSubCategory } from "../hooks/Catalogue/CatalogueSubCategoryHook";

const Category = ({ onSelectSubcategory }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);

  const { data: catalogueCategoryData } = useGetAllCatalogueCategory();
  const { data: catalogueSubCategoryData } = useGetAllCatalogueSubCategory();

  const catalogueCategories = useMemo(() => {
    return (catalogueCategoryData || []).map((category) => ({
      ...category,
      submenu: (catalogueSubCategoryData || [])
        .filter((sub) => {
          const parentId = sub.cataloguecategory?._id || sub.cataloguecategory;
          return String(parentId) === String(category._id);
        })
        .map((sub) => ({ _id: sub._id, name: sub.cataloguesubcategory })),
    }));
  }, [catalogueCategoryData, catalogueSubCategoryData]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCheckboxChange = (subId) => {
    setSelectedSubcategoryIds((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  useEffect(() => {
    onSelectSubcategory(selectedSubcategoryIds);
  }, [selectedSubcategoryIds, onSelectSubcategory]);

  const clearAll = () => setSelectedSubcategoryIds([]);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-sand-200">
        <div>
          <span className="eyebrow !text-[10px]">Filter</span>
          <h3 className="display text-2xl mt-2">Collections</h3>
        </div>
        {selectedSubcategoryIds.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-[11px] tracking-[0.22em] uppercase font-semibold text-primary hover:text-primary-dark"
          >
            Clear ({selectedSubcategoryIds.length})
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {catalogueCategories.length === 0 && (
          <div className="text-[13px] text-sand-500 py-2">Loading filters…</div>
        )}

        {catalogueCategories.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item._id} className="border-b border-sand-200">
              <button
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                className={`flex items-center justify-between w-full py-4 text-left transition-colors ${
                  isOpen ? "text-ink" : "text-ink/85 hover:text-ink"
                }`}
              >
                <span className="text-[13px] tracking-[0.18em] uppercase font-semibold capitalize">
                  {item.cataloguecategory}
                </span>
                <FiChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : "text-sand-400"
                  }`}
                />
              </button>
              {isOpen && (
                <ul className="pb-4 flex flex-col gap-2.5">
                  {item.submenu.length === 0 ? (
                    <li className="text-[12.5px] text-sand-400 pl-1">No subcategories</li>
                  ) : (
                    item.submenu.map((sub) => {
                      const checked = selectedSubcategoryIds.includes(sub._id);
                      return (
                        <li key={sub._id}>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <span
                              className={`w-4 h-4 inline-flex items-center justify-center border transition-colors ${
                                checked
                                  ? "bg-ink border-ink"
                                  : "bg-white border-sand-300 group-hover:border-ink"
                              }`}
                            >
                              {checked && (
                                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white">
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2 6.5l3 3 5-6"
                                  />
                                </svg>
                              )}
                            </span>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => handleCheckboxChange(sub._id)}
                            />
                            <span className="text-[13.5px] text-ink/85 group-hover:text-primary transition-colors">
                              {sub.name}
                            </span>
                          </label>
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
