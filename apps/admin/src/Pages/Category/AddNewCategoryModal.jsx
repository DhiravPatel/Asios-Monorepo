import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddCategory } from "../../hooks/Category/CategoryHook";

const AddNewCategoryModal = ({ visible, onClose, fetchCategories }) => {
  const { mutate: addCategory } = useAddCategory();
  const [categoryName, setCategoryName] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (visible) {
      setCategoryName("");
      setFile(null);
      setPreviewUrl(null);
    }
  }, [visible]);

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const selectedFile = info.fileList[0].originFileObj;
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !file) {
      message.error("Please enter a category name and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("category", categoryName);
      formData.append("image", file);

      await addCategory(formData);
      message.success("Category added successfully!");
      fetchCategories();
      setCategoryName("");
      setFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error) {
      message.error("Failed to add category.");
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title="Add New Category"
      open={visible}
      onOk={handleSubmit}
      onCancel={() => {
        setCategoryName("");
        setFile(null);
        setPreviewUrl("");
        onClose();
      }}
      okText="Add"
      cancelText="Cancel"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-36">Category name:</span>
          <Input
            type="text"
            placeholder="Enter category name here"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28">Upload:</span>
          <Upload
            // showUploadList={false}
            beforeUpload={() => false} 
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        {previewUrl && (
          <div className="flex items-center gap-3">
            <span className="w-28">Preview:</span>
            <img src={previewUrl} alt="Category Preview" style={{ width: 100, height: 100 }} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddNewCategoryModal;
