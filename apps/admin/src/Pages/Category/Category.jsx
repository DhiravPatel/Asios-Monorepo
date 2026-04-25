import React, { useState } from "react";
import { Button, Table, Modal, Input, Upload, message, Image, Pagination } from "antd";
import { CaretUpOutlined, DeleteOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import AddNewCategoryModal from "./AddNewCategoryModal";
import Search from "antd/es/input/Search";
import {
  useGetAllCategories,
  useEditCategory,
  useDeleteCategory,
} from "../../hooks/Category/CategoryHook";

const Category = () => {
  const { data: dataSource, loading, refetch: fetchCategories } = useGetAllCategories();
  const { mutate: editCategory } = useEditCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [addNewTypeModalOpen, setAddNewTypeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteCategory(id);
          message.success("Category deleted successfully!");
          fetchCategories();
        } catch (error) {
          message.error("Failed to delete category.");
          console.error("Error:", error);
        }
      },
    });
  };

  const handleUpdate = async () => {
    try {
      const id = modalContent._id;
      const formData = new FormData();
      formData.append("category", updatedCategory || modalContent.category);
      const imageToSend = updatedImage || previewImage;
      if (imageToSend) {
        formData.append("image", imageToSend);
      }
      await editCategory(id, formData);
      message.success("Category updated successfully!");
      fetchCategories();
      handleCancel();
    } catch (error) {
      message.error("Failed to update category.");
      console.error("Error:", error);
    }
  };

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setUpdatedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setUpdatedImage(null);
      setPreviewImage(modalContent.image);
    }
  };

  const columns = (showModal) => [
    {
      title: (
        <span className="flex items-center">
          Number <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "_id",
      key: "_id",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <div className="iconbutton" onClick={() => showModal(record)}>
            <EditOutlined />
          </div>
          <div className="iconbutton" onClick={() => handleDelete(record._id)}>
            <DeleteOutlined />
          </div>
        </div>
      ),
    },
  ];

  const showModal = (record) => {
    setModalContent(record);
    setUpdatedCategory(record.category);
    setPreviewImage(record.image);
    setUpdatedImage(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setUpdatedCategory('');
    setPreviewImage(null);
    setUpdatedImage(null);
  };

  const handleOk = () => {
    handleUpdate();
  };

  const openAddNewTypeModal = () => {
    setAddNewTypeModalOpen(true);
  };

  const closeAddNewTypeModal = () => {
    setAddNewTypeModalOpen(false);
  };

  // Filtered data based on search query
  const filteredDataSource = dataSource.filter(item =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate paginated data
  const paginatedDataSource = filteredDataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="p-4 bg-white rounded-md">
        <div className="mb-3 text-end">
          <Search
            placeholder="Search Category"
            style={{ width: 200 }}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button style={{ marginLeft: '15px' }} onClick={openAddNewTypeModal}>
            Add New Category
          </Button>
        </div>
        <div className="flex gap-3 items-center font-bold mb-3">
          Category List
          <span className="bg-red-700 text-white p-1 h-7 text-center w-7 rounded-sm">
            {filteredDataSource.length}
          </span>
        </div>
        <Table
          dataSource={paginatedDataSource}
          columns={columns(showModal)}
          pagination={false}
          className="border border-gray-200"
          loading={loading}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredDataSource.length}
          onChange={page => setCurrentPage(page)}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </div>

      <Modal
        title="Edit Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-36">Category:</span>
            <Input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              placeholder="Enter category name"
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
          <div className="flex items-center gap-3">
            <span className="w-28">Preview:</span>
            {previewImage && (
              <img src={previewImage} alt="Category Preview" style={{ width: 100, height: 100 }} />
            )}
          </div>
        </div>
      </Modal>

      <AddNewCategoryModal
        visible={addNewTypeModalOpen}
        onClose={closeAddNewTypeModal}
        fetchCategories={fetchCategories}
      />
    </>
  );
};

export default Category;
