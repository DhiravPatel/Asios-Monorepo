import React, { useState } from "react";
import { Button, Table, Pagination, Image, Modal, message, Select } from "antd";
import { CaretUpOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddProductsModal from "./AddProductsModal";
import Input from "antd/es/input/Input";
import Search from "antd/es/input/Search";
import { useGetAllProducts, useDeleteProduct } from "../../hooks/Product/ProductHook";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";

const { Option } = Select;

const Product = () => {
  const { data: products, refetch: fetchProducts } = useGetAllProducts();
  const { data: categories } = useGetAllCategories();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');

  const showAddProductModal = (product) => {
    setSelectedProduct(product);
    setIsAddProductModalVisible(true);
  };

  const hideAddProductModal = () => {
    setIsAddProductModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteProduct(id);
          await fetchProducts();
          message.success("Product deleted successfully!");
        } catch (error) {
          message.error("Failed to delete product.");
          console.error("Error:", error);
        }
      },
    });
  };

  const handleClear = ()=>{
    setSelectedCategory(null)
    setSelectedSubcategory('')
    setProductNameFilter('')
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory(''); 
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
  };

  const handleProductNameChange = (e) => {
    setProductNameFilter(e.target.value);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const productCatId = product.category?._id || product.category;
    const productSubId = product.subcategory?._id || product.subcategory;
    const categoryMatch = selectedCategory ? String(productCatId) === String(selectedCategory) : true;
    const subcategoryMatch = selectedSubcategory ? String(productSubId) === String(selectedSubcategory) : true;
    const nameMatch = product.productName.toLowerCase().includes(productNameFilter.toLowerCase());
    return categoryMatch && subcategoryMatch && nameMatch;
  });

  const uniqueSubcategories = selectedCategory
    ? products
        .filter(product => String(product.category?._id || product.category) === String(selectedCategory))
        .map(product => product.subcategory)
        .filter(Boolean)
        .filter((sub, index, self) => {
          const subId = sub?._id || sub;
          return self.findIndex(s => String(s?._id || s) === String(subId)) === index;
        })
    : [];

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (text) => (
        <Image src={text.image} alt="Product" style={{ width: 70, height: 70, borderRadius: '5px' }} />
      ),
    },
    {
      title: (
        <span className="flex items-center">
          Name <CaretUpOutlined className="ml-1" />
        </span>
      ),
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: (
        <span className="flex items-center">
          Category <CaretUpOutlined className="ml-1" />
        </span>
      ),
      key: "category",
      render: (_, record) => record.category?.category || '',
    },
    {
      title: (
        <span className="flex items-center">
          Subcategory <CaretUpOutlined className="ml-1" />
        </span>
      ),
      key: "subcategory",
      render: (_, record) => record.subcategory?.subcategory || '',
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
          <a onClick={() => showAddProductModal(record)} className="iconbutton">
            <EditOutlined />
          </a>
          <a className="iconbutton" onClick={() => handleDelete(record._id)}>
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="admin-page">
      <div className="admin-page__action-bar">
        <Button className="admin-add-btn" onClick={() => showAddProductModal(null)}>
          Add New Product
        </Button>
      </div>

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Catalogue · Product</span>
            <h2 className="admin-page__title">Product List</h2>
          </div>
          <div className="admin-page__filters">
            <Select
              placeholder="Select Category"
              onChange={handleCategoryChange}
              style={{ width: 180 }}
              value={selectedCategory}
              allowClear
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.category}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select Subcategory"
              onChange={handleSubcategoryChange}
              style={{ width: 180 }}
              disabled={!selectedCategory}
              value={selectedSubcategory || undefined}
              allowClear
            >
              {uniqueSubcategories.map((sub) => {
                const subId = sub?._id || sub;
                const subName = sub?.subcategory || sub;
                return (
                  <Option key={subId} value={subId}>
                    {subName}
                  </Option>
                );
              })}
            </Select>
            <Search
              placeholder="Search Product"
              style={{ width: 200 }}
              onChange={handleProductNameChange}
              value={productNameFilter}
            />
            <Button onClick={handleClear} className="admin-modal-clear-btn">
              Clear
            </Button>
          </div>
        </div>

        <div className="admin-page__card-body">
          <Table
            dataSource={currentProducts}
            columns={columns}
            pagination={false}
            rowKey={(record) => record._id}
          />
        </div>

        <div className="admin-page__pagination-wrap">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredProducts.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>

      <AddProductsModal
        visible={isAddProductModalVisible}
        onClose={hideAddProductModal}
        product={selectedProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default Product;
