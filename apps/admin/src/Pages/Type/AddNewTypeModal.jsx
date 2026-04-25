import React, { useState, useEffect, useMemo } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";
import { useAddSubCategory } from "../../hooks/SubCategory/SubCategoryHook";

const AddNewTypeModal = ({ visible, onClose, fetchSubCategories }) => {
  const { data: categories } = useGetAllCategories();
  const { mutate: addSubCategory } = useAddSubCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategory, setSubCategory] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const categoryMap = useMemo(() => {
    return (categories || []).reduce((acc, category) => {
      acc[category._id] = category.category;
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    if (!visible) {
      setSelectedCategory(null);
      setSubCategory('');
      setImage(null);
      setPreviewImage(null);
    }
  }, [visible]);

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setImage(file);
    } else {
      setPreviewImage('');
      setImage(null);
    }
  };
  
  const handleSubmit = async () => {
    if (!selectedCategory || !subCategory || !image) {
      message.error("Please fill all fields and upload an image.");
      return;
    }
  
    try {
      const categoryName = categoryMap[selectedCategory];
      const formData = new FormData();
      formData.append("category", categoryName);
      formData.append("subcategory", subCategory);
      formData.append("image", image);

      await addSubCategory(formData);
      message.success("Sub-category added successfully!");
      fetchSubCategories()
      handleCancel();
    } catch (error) {
      message.error("Failed to add sub-category.");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedCategory(null);
    setSubCategory('');
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <Modal
      title="Add New Sub-Category"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-36">Category:</span>
          <Select
            style={{ width: "100%" }}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            placeholder="Select a category"
          >
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.category}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-36">Sub-Category:</span>
          <Input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Enter sub-category name"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28">Upload Image:</span>
          <Upload
            beforeUpload={() => false}
            // showUploadList={false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        {previewImage && (
          <div className="flex items-center gap-3">
            <span className="w-28">Preview:</span>
            <img src={previewImage} alt="Preview" style={{ width: 100, height: 100 }} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddNewTypeModal;
