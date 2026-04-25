import { Select, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { useGetAllCatalogueCategory } from "../../hooks/Catalogue/CatalogueCategoryHook";
import { useAddCatalogueSubCategory } from "../../hooks/Catalogue/CatalogueSubCategoryHook";

const { Option } = Select;

const AddCatelougeSubCategory = ({ visible, onClose }) => {
  const { data: catalogueCategories } = useGetAllCatalogueCategory();
  const { mutate: addCatalogueSubCategory } = useAddCatalogueSubCategory();
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState("");
  const [cataloguesubcategory, setCatalogueSubCategory] = useState("");

  const handleOk = async () => {
    try {
      await addCatalogueSubCategory({
        cataloguecategory: selectedCatalogueCategory,
        cataloguesubcategory,
      });
      message.success("Catalogue Sub-Category added successfully!");
      onClose();
      resetFields();
    } catch (error) {
      message.error(
        `Error adding sub-category: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCancel = () => {
    resetFields()
    onClose();
  };

  const handleCatalogueCategoryChange = (value) => {
    setSelectedCatalogueCategory(value);
  };
  const resetFields = () => {
    setSelectedCatalogueCategory('');
    setCatalogueSubCategory("");
  };

  return (
    <Modal
      title="Add New Catalogue Sub-Category"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="flex flex-col space-y-4 mt-5">
        <div className="flex items-center gap-3">
          <span className="w-36">Category:</span>
          <Select
                        placeholder="Select a category"
                        value={selectedCatalogueCategory || undefined}
                        options={catalogueCategories.map(category => ({
                            value: category._id,
                            label: category.cataloguecategory
                        }))}
                        onChange={handleCatalogueCategoryChange}
                        style={{ width: '100%' }}
                    />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-36">Sub-Category:</span>
          <Input
            type="text"
            placeholder="Enter sub-category here"
            value={cataloguesubcategory}
            onChange={(e) => setCatalogueSubCategory(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddCatelougeSubCategory;
