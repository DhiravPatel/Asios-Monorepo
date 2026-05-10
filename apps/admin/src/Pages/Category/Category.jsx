import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Upload, message, Image, Pagination } from "antd";
import { CaretUpOutlined, DeleteOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import AddNewCategoryModal from "./AddNewCategoryModal";
import Search from "antd/es/input/Search";
import {
  useGetCategories,
  useEditCategory,
  useDeleteCategory,
} from "../../hooks/Category/CategoryHook";

const PAGE_SIZE = 8;

const Category = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQ]);

  const {
    data: dataSource,
    total,
    loading,
    refetch: fetchCategories,
  } = useGetCategories({
    page: currentPage,
    limit: PAGE_SIZE,
    q: debouncedQ || undefined,
  });
  const { mutate: editCategory } = useEditCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [addNewTypeModalOpen, setAddNewTypeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

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

  return (
    <div className="admin-page">
      <div className="admin-page__action-bar">
        <Button className="admin-add-btn" onClick={openAddNewTypeModal}>
          Add New Category
        </Button>
      </div>

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Catalogue · Category</span>
            <h2 className="admin-page__title">Category List</h2>
          </div>
          <div className="admin-page__filters">
            <Search
              placeholder="Search Category"
              style={{ width: 220 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-page__card-body">
          <Table
            dataSource={dataSource}
            columns={columns(showModal)}
            pagination={false}
            loading={loading}
            rowKey={(record) => record._id}
          />
        </div>

        <div className="admin-page__pagination-wrap">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
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
    </div>
  );
};

export default Category;
