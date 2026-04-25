import React, { useState } from "react";
import { Button, Table, Modal, Input, Upload, message, Image, Pagination, Select } from "antd";
import { CaretUpOutlined, DeleteOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import AddNewTypeModal from "./AddNewTypeModal";
import {
  useGetAllSubCategories,
  useEditSubCategory,
  useDeleteSubCategory,
} from "../../hooks/SubCategory/SubCategoryHook";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";

const { Option } = Select;

const Type = () => {
  const { data: dataSource, loading, refetch: fetchSubCategories } = useGetAllSubCategories();
  const { data: categories } = useGetAllCategories();
  const { mutate: editSubCategory } = useEditSubCategory();
  const { mutate: deleteSubCategory } = useDeleteSubCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewTypeModalOpen, setAddNewTypeModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editSubCategoryName, setEditSubCategoryName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this sub-category?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteSubCategory(id);
          message.success("Sub-category deleted successfully!");
          fetchSubCategories();
        } catch (error) {
          message.error("Failed to delete sub-category.");
          console.error("Error:", error);
        }
      },
    });
  };

  const showModal = (record) => {
    setModalContent(record);
    setEditCategory(record.category);
    setEditSubCategoryName(record.subcategory);
    setEditImage(record.image);
    setEditImagePreview(record.image);
    setIsModalOpen(true);
  };

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const url = URL.createObjectURL(file);
      setEditImagePreview(url);
      setEditImage(file);
    } else {
      setEditImagePreview(null);
      setEditImage(null);
    }
  };

  const handleEditSubmit = async () => {
    if (!editCategory || !editSubCategoryName || !editImage) {
      message.error("Please fill all fields and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("category", editCategory);
      formData.append("subcategory", editSubCategoryName);
      formData.append("image", editImage);

      await editSubCategory(modalContent._id, formData);

      message.success("Sub-category updated successfully!");
      fetchSubCategories();
      handleCancel();
    } catch (error) {
      message.error("Failed to update sub-category.");
      console.error("Error:", error);
    }
  };

  const handleOk = () => {
    handleEditSubmit();
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditCategory('');
    setEditSubCategoryName('');
    setEditImage(null);
    setEditImagePreview(null);
  };

  const openAddNewTypeModal = () => {
    setAddNewTypeModalOpen(true);
  };

  const closeAddNewTypeModal = () => {
    setAddNewTypeModalOpen(false);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(null); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  const filteredDataSource = dataSource.filter(item => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const subCategoryMatch = selectedSubCategory ? item.subcategory === selectedSubCategory : true;
    return categoryMatch && subCategoryMatch;
  });

  const columns = () => [
    {
      title: (
        <span className="flex items-center">
          Number <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "number",
      key: "number",
      render: (_, record, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    {
      title: "Image",
      key: "image",
      render: (text) => (
        <Image src={text.image} alt="Category" style={{ width: 70, height: 70, borderRadius: '5px' }} />
      ),
    },
    {
      title: (
        <span className="flex items-center">
          Sub-Category <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "subcategory",
      key: "subcategory",
      filterIcon: (filtered) => (
        <CaretUpOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: (
        <span className="flex items-center">
          Category <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "category",
      key: "category",
      filterIcon: (filtered) => (
        <CaretUpOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    },
    {
      title: (
        <span className="flex items-center">
          Date <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <a onClick={() => showModal(record)} className="iconbutton">
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record._id)} className="iconbutton">
            <DeleteOutlined />
          </a>
        </div>
      )
    }
  ];

  // Pagination logic
  const paginatedDataSource = filteredDataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="mb-3 text-end">
        <Button onClick={openAddNewTypeModal}>Add New Sub-Category</Button>
      </div>
      <div className="p-4 bg-white rounded-md">
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <div className="flex gap-3 items-center font-bold mb-3">
          Type List
          <span className="bg-red-700 text-white p-1 h-7 text-center w-7 rounded-sm">
            {dataSource.length}
          </span>
        </div>
        <div className="flex mb-4">
          <Select
            placeholder="Select Category"
            onChange={handleCategoryChange}
            style={{ width: 200, marginRight: '16px' }}
          >
            {categories.map(category => (
              <Option key={category._id} value={category.category}>
                {category.category}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Sub-Category"
            onChange={handleSubCategoryChange}
            style={{ width: 200 }}
            disabled={!selectedCategory} 
          >
            {dataSource.filter(item => item.category === selectedCategory)
              .map(item => (
                <Option key={item._id} value={item.subcategory}>
                  {item.subcategory}
                </Option>
              ))}
          </Select>
        </div>
        </div>
        
        

        <Table
          dataSource={paginatedDataSource}
          columns={columns()}
          pagination={false}
          className="border border-gray-200"
          loading={loading}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredDataSource.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </div>
      <Modal
        title="Edit Sub-Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-36">Category:</span>
            <Input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Enter category name"
              disabled
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-36">Sub-Category:</span>
            <Input
              type="text"
              value={editSubCategoryName}
              onChange={(e) => setEditSubCategoryName(e.target.value)}
              placeholder="Enter sub-category name"
              // disabled
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-28">Upload Image:</span>
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>
                Upload Image
              </Button>
            </Upload>
          </div>
          <div className="flex justify-center">
            {editImagePreview && <Image src={editImagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px' }} />}
          </div>
        </div>
      </Modal>

      <AddNewTypeModal visible={addNewTypeModalOpen} onClose={closeAddNewTypeModal} fetchSubCategories={fetchSubCategories} />
    </>
  );
};

export default Type;
