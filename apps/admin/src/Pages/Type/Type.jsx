import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, Modal, Input, Upload, message, Image, Pagination, Select } from "antd";
import Search from "antd/es/input/Search";
import { DeleteOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import AddNewTypeModal from "./AddNewTypeModal";
import {
  useGetSubCategoryPageData,
  useEditSubCategory,
  useDeleteSubCategory,
} from "../../hooks/SubCategory/SubCategoryHook";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";

const { Option } = Select;
const PAGE_SIZE = 8;

const Type = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  // Categories list (for filter dropdown + Add modal) is lazy-loaded — only
  // fetched once the user opens the dropdown or clicks Add.
  const [needsCategories, setNeedsCategories] = useState(false);
  const triggerCategories = useCallback(() => setNeedsCategories(true), []);

  // Debounce search input to avoid hammering the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ((selectedSubCategory || '').trim()), 250);
    return () => clearTimeout(t);
  }, [selectedSubCategory]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedQ]);

  // Lean call — paginated subcategories only.
  const {
    data: dataSource,
    total,
    loading,
    refetch: fetchSubCategories,
  } = useGetSubCategoryPageData({
    page: currentPage,
    limit: PAGE_SIZE,
    category: selectedCategory || undefined,
    q: debouncedQ || undefined,
  });

  const { data: categories = [] } = useGetAllCategories({ enabled: needsCategories });

  const { mutate: editSubCategory } = useEditSubCategory();
  const { mutate: deleteSubCategory } = useDeleteSubCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewTypeModalOpen, setAddNewTypeModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editSubCategoryName, setEditSubCategoryName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

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
    const categoryId = record.category?._id || record.category;
    setEditCategory(categoryId);
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
    triggerCategories();
    setAddNewTypeModalOpen(true);
  };

  const closeAddNewTypeModal = () => {
    setAddNewTypeModalOpen(false);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(null); // Reset sub-category when category changes
  };

  const columns = () => [
    {
      title: "Image",
      key: "image",
      render: (text) => (
        <Image src={text.image} alt="Category" style={{ width: 70, height: 70, borderRadius: '5px' }} />
      ),
    },
    {
      title: "Sub-Category",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: (
        <span className="flex items-center">
          Category
        </span>
      ),
      key: "category",
      render: (_, record) => record.category?.category || '',
    },
    {
      title: "Date",
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

  return (
    <div className="admin-page">
      <div className="admin-page__action-bar">
        <Button className="admin-add-btn" onClick={openAddNewTypeModal}>
          Add New Sub-Category
        </Button>
      </div>

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Catalogue · Type</span>
            <h2 className="admin-page__title">Type List</h2>
          </div>
          <div className="admin-page__filters">
            <Select
              placeholder="Select Category"
              onChange={handleCategoryChange}
              onOpenChange={(open) => open && triggerCategories()}
              style={{ width: 200 }}
              value={selectedCategory}
              allowClear
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.category}
                </Option>
              ))}
            </Select>
            <Search
              placeholder="Search Sub-Category"
              style={{ width: 220 }}
              value={selectedSubCategory || ''}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-page__card-body">
          <Table
            dataSource={dataSource}
            columns={columns()}
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
              value={modalContent?.category?.category || ''}
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

      <AddNewTypeModal
        visible={addNewTypeModalOpen}
        onClose={closeAddNewTypeModal}
        fetchSubCategories={fetchSubCategories}
        categories={categories}
      />
    </div>
  );
};

export default Type;
