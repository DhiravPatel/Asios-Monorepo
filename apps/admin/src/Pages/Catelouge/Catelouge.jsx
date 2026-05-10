import React, { useState } from "react";
import { Button, Table, Pagination, message, Image, Modal } from "antd";
import { CaretUpOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddCatelouge from "./AddCatelouge";
import AddCatelougeCategory from "./AddCatelougeCategory";
import AddCatelougeSubCategory from "./AddCatelougeSubCategory";
import { useGetAllCatalogue, useDeleteCatalogue } from "../../hooks/Catalogue/CatalogueHook";

const Product = () => {
  const { data: catalogueData, refetch: fetchCatalogueData } = useGetAllCatalogue();
  const { mutate: deleteCatalogue } = useDeleteCatalogue();

  const [isAddCatalougeModalVisible, setIsAddCatalougeModalVisible] = useState(false);
  const [isAddCatalougeCategoryModalVisible, setIsAddCatalougeCategoryModalVisible] = useState(false);
  const [isAddCatalougeSubCategoryModalVisible, setIsAddCatalougeSubCategoryModalVisible] = useState(false);
  const [currentCatalogue, setCurrentCatalogue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = catalogueData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this catalogue?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteCatalogue(id);
          await fetchCatalogueData();
          message.success("Catalogue deleted successfully!");
        } catch (error) {
          message.error("Failed to delete catalogue.");
          console.error("Error:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (text) => (
        <Image src={text.image} alt="Product" style={{ width: 70, height: 70, borderRadius: '5px' }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "cataloguecategory",
      render: (_, record) => record.cataloguecategory?.cataloguecategory || '',
    },
    {
      title: "Subcategory",
      key: "cataloguesubcategory",
      render: (_, record) => record.cataloguesubcategory?.cataloguesubcategory || '',
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link) => (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer" 
          style={{ color: 'blue', textDecoration: 'underline' }} 
        >
          {/* {link.length > 30 ? `${link.substring(0, 30)}...` : link}  */}
          link
        </a>
      ),
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
          <a onClick={() => showAddCatelougeModal(record)} className="iconbutton">
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record._id)} className="iconbutton">
            <DeleteOutlined />
          </a>
        </div>
      )
    }
  ];

  const showAddCatelougeModal = (catalogue) => {
    setCurrentCatalogue(catalogue);
    setIsAddCatalougeModalVisible(true);
  };

  const hideAddCatelougeModal = () => {
    setIsAddCatalougeModalVisible(false);
    setCurrentCatalogue(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__action-bar">
        <Button className="admin-add-btn" onClick={() => showAddCatelougeModal(null)}>
          Add New Catalogue
        </Button>
        <Button
          className="admin-add-btn"
          onClick={() => setIsAddCatalougeCategoryModalVisible(true)}
        >
          Add Catalogue Category
        </Button>
        <Button
          className="admin-add-btn"
          onClick={() => setIsAddCatalougeSubCategoryModalVisible(true)}
        >
          Add Catalogue Sub-Category
        </Button>
      </div>

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Catalogue · Editions</span>
            <h2 className="admin-page__title">Catalogue List</h2>
          </div>
        </div>

        <div className="admin-page__card-body">
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            rowKey="_id"
          />
        </div>

        <div className="admin-page__pagination-wrap">
          <Pagination
            current={currentPage}
            total={catalogueData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      <AddCatelouge
        visible={isAddCatalougeModalVisible}
        onClose={hideAddCatelougeModal}
        catalogue={currentCatalogue}
        fetchCatalogueData={fetchCatalogueData}
      />
      <AddCatelougeCategory
        visible={isAddCatalougeCategoryModalVisible}
        onClose={() => setIsAddCatalougeCategoryModalVisible(false)}
      />
      <AddCatelougeSubCategory
        visible={isAddCatalougeSubCategoryModalVisible}
        onClose={() => setIsAddCatalougeSubCategoryModalVisible(false)}
      />
    </div>
  );
};

export default Product;
