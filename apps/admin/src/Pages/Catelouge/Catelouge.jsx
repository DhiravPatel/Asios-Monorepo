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
      title: (
        <span className="flex items-center">
          Number <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => index + 1 + (currentPage - 1) * itemsPerPage,
    },
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
    <>
      <div className="flex justify-end items-center gap-2 mb-3">
        <Button onClick={() => showAddCatelougeModal(null)}>Add New Catalogue</Button>
        <Button onClick={() => setIsAddCatalougeCategoryModalVisible(true)}>Add New Catalogue Category</Button>
        <Button onClick={() => setIsAddCatalougeSubCategoryModalVisible(true)}>Add New Catalogue Sub-Category</Button>
      </div>
      <div className="p-4 bg-white rounded-md h-[calc(100%-100px)] flex flex-col justify-between">
        <div>
          <div className="flex gap-3 items-center font-bold mb-3">
            Catalogue List
            <span className="bg-red-700 text-white p-1 h-7 text-center w-7 rounded-sm">
              {catalogueData.length}
            </span>
          </div>
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            className="border border-gray-200"
            rowKey="_id"
          />
        </div>
        <Pagination 
          current={currentPage} 
          total={catalogueData.length} 
          pageSize={itemsPerPage} 
          onChange={handlePageChange} 
          className="mt-2"
        />
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
    </>
  );
};

export default Product;
