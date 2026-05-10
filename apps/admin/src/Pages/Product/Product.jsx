import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table, Pagination, Image, Modal, message, Select } from "antd";
import { CaretUpOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddProductsModal from "./AddProductsModal";
import Search from "antd/es/input/Search";
import { useGetProductPageData, useDeleteProduct } from "../../hooks/Product/ProductHook";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";
import { useGetAllSubCategories } from "../../hooks/SubCategory/SubCategoryHook";

const { Option } = Select;
const ITEMS_PER_PAGE = 8;

const Product = () => {
  const { mutate: deleteProduct } = useDeleteProduct();

  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state (server-driven)
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  // Reference data (categories + subcategories) is lazy-loaded — only fetched
  // once the user opens the Add/Edit modal or engages a filter dropdown.
  const [needsRefData, setNeedsRefData] = useState(false);
  const triggerRefData = useCallback(() => setNeedsRefData(true), []);

  // Debounce search input so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(productNameFilter.trim()), 250);
    return () => clearTimeout(t);
  }, [productNameFilter]);

  // Reset to first page whenever a filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, debouncedQ]);

  // Lean call — paginated products only.
  const {
    data: products,
    total,
    loading,
    refetch: fetchProducts,
  } = useGetProductPageData({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    q: debouncedQ || undefined,
  });

  // Reference data for filter dropdowns + Add/Edit modal. Deferred via
  // `enabled` so we don't ship the full lists on initial page load.
  const { data: categories = [] } = useGetAllCategories({ enabled: needsRefData });
  const { data: subcategories = [] } = useGetAllSubCategories({ enabled: needsRefData });

  const showAddProductModal = (product) => {
    triggerRefData();
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

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedSubcategory('');
    setProductNameFilter('');
  };

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

  // Subcategories available for the selected category — cached subcategory list
  const uniqueSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return (subcategories || []).filter(
      (s) => String(s.category?._id || s.category) === String(selectedCategory)
    );
  }, [subcategories, selectedCategory]);

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
              onOpenChange={(open) => open && triggerRefData()}
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
              onOpenChange={(open) => open && triggerRefData()}
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
            dataSource={products}
            columns={columns}
            pagination={false}
            loading={loading}
            rowKey={(record) => record._id}
          />
        </div>

        <div className="admin-page__pagination-wrap">
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={total}
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
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
};

export default Product;
