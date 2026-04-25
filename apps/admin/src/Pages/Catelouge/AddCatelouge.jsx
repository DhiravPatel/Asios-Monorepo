import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddCatalogue, useEditCatalogue } from "../../hooks/Catalogue/CatalogueHook";
import { useGetAllCatalogueCategory } from "../../hooks/Catalogue/CatalogueCategoryHook";
import { useGetAllCatalogueSubCategory } from "../../hooks/Catalogue/CatalogueSubCategoryHook";

const AddCatelouge = ({ visible, onClose, catalogue, fetchCatalogueData }) => {
  const { data: catalogueCategories } = useGetAllCatalogueCategory();
  const { data: allSubcatalogueCategories } = useGetAllCatalogueSubCategory();
  const { mutate: addCatalogue } = useAddCatalogue();
  const { mutate: editCatalogue } = useEditCatalogue();

  const [filteredSubcatalogueCategories, setFilteredSubcatalogueCategories] = useState([]);
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState(null);
  const [selectedCatalogueSubcategory, setSelectedCatalogueSubcategory] = useState(null);
  const [catalogueName, setCatalogueName] = useState("");
  const [catalogueLink, setCatalogueLink] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (visible && catalogue) {
      setCatalogueName(catalogue.name || "");
      setCatalogueLink(catalogue.link || "");
      setSelectedCatalogueCategory(catalogue.cataloguecategory || null);
      setSelectedCatalogueSubcategory(catalogue.cataloguesubcategory || null);
      if (catalogue.image) {
        setPreviewUrl(catalogue.image);
        setFile(null);
      } else {
        setFile(null);
        setPreviewUrl("");
      }
      const filtered = (allSubcatalogueCategories || []).filter(
        sub => sub.cataloguecategory === catalogue.cataloguecategory
      );
      setFilteredSubcatalogueCategories(filtered);
    } else if (!visible) {
      resetForm();
    }
  }, [visible, catalogue, allSubcatalogueCategories]);

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const selectedFile = info.fileList[0].originFileObj;
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl("");
    }
  };

  const handleCatalogueCategoryChange = (value) => {
    setSelectedCatalogueCategory(value);
    setSelectedCatalogueSubcategory(null);
    const filtered = (allSubcatalogueCategories || []).filter(sub => sub.cataloguecategory === value);
    setFilteredSubcatalogueCategories(filtered);
  };

  const handleOk = async () => {
    try {
      const formData = new FormData();
      formData.append("name", catalogueName);
      formData.append("link", catalogueLink);
      formData.append("cataloguecategory", selectedCatalogueCategory);
      formData.append("cataloguesubcategory", selectedCatalogueSubcategory);
      if (file) {
        formData.append("image", file);
      } else {
        formData.append("image", catalogue.image);
      }

      if (catalogue) {
        await editCatalogue(catalogue._id, formData);
      } else {
        await addCatalogue(formData);
      }

      message.success(`${catalogue ? "Catalogue updated" : "Catalogue added"} successfully!`);
      fetchCatalogueData()
      resetForm();
      onClose();
    } catch (error) {
      message.error("Failed to add/edit catalogue.");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setCatalogueName("");
    setCatalogueLink("");
    setFile(null);
    setPreviewUrl("");
    setSelectedCatalogueCategory(null);
    setSelectedCatalogueSubcategory(null);
    setFilteredSubcatalogueCategories([]);
  };



  return (
    <Modal
      title={catalogue ? "Edit Catalogue" : "Add New Catalogue"}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-36">Select Category:</span>
          <Select
            placeholder="Select a category"
            options={catalogueCategories.map(category => ({
              value: category.cataloguecategory,
              label: category.label
            }))}
            onChange={handleCatalogueCategoryChange}
            value={selectedCatalogueCategory}
            disabled={!!catalogue}
          />
          <Select
            placeholder="Select a subcategory"
            value={selectedCatalogueSubcategory}
            onChange={setSelectedCatalogueSubcategory}
            disabled={!!catalogue}
          >
            {filteredSubcatalogueCategories.map(sub => (
              <Select.Option key={sub.cataloguesubcategory} value={sub.cataloguesubcategory}>
                {sub.cataloguesubcategory}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-36">Name:</span>
          <Input
            type="text"
            placeholder="Enter Name here"
            value={catalogueName}
            onChange={(e) => setCatalogueName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-36">Link:</span>
          <Input
            type="text"
            placeholder="Enter link here"
            value={catalogueLink}
            onChange={(e) => setCatalogueLink(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28">Cover Image:</span>
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        {previewUrl && (
          <div className="flex items-center gap-3">
            <span className="w-28">Preview:</span>
            <img src={previewUrl} alt="Catalogue Preview" style={{ width: 100, height: 100 }} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddCatelouge;
