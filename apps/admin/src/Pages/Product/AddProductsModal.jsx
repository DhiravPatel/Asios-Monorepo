import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, Button, message, Select, Form, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddProduct, useEditProduct } from "../../hooks/Product/ProductHook";
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";
import { useGetAllSubCategories } from "../../hooks/SubCategory/SubCategoryHook";

const AddProductsModal = ({ visible, onClose, product, fetchProducts }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categories, loading: loadingCategories } = useGetAllCategories();
  const { data: allSubcategories, loading: loadingSubcategories } = useGetAllSubCategories();
  const { mutate: addProduct } = useAddProduct();
  const { mutate: editProduct } = useEditProduct();

  const loading = loadingCategories || loadingSubcategories;

 useEffect(() => {
  if (visible) {
    if (product) {
      const { productName, category, subcategory, details, image: productImage } = product;

      const detailsObj = JSON.parse(details || '{}');

      form.setFieldsValue({
        productName,
        category,
        subcategory,
        model: detailsObj.model || '',
        size: detailsObj.size || '',
        surface: detailsObj.surface || '',
        thickness: detailsObj.thickness || '',
        grade: detailsObj.grade || '',
        packing: detailsObj.packing || '',
        weight: detailsObj.weight || '',
        application: detailsObj.application || '',
        type: detailsObj.type || '',
        color: detailsObj.color || '',
        link: detailsObj.link || '',
      });


      setImage(productImage);
      setSelectedCategory(category);
    } else {
      form.resetFields();
      setImage(null);
    }
  }
}, [visible, product, form]);



  useEffect(() => {
    if (selectedCategory) {
      const filtered = allSubcategories.filter(sub => sub.category === selectedCategory);
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, allSubcategories]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ subcategory: undefined });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const {
        productName,
        category,
        subcategory,
        model,
        thickness,
        size,
        surface,
        grade,
        packing,
        weight,
        application,
        type,
        color,
        link
      } = values;

      const details = {};
      if (thickness) details.thickness = thickness;
      if (size) details.size = size;
      if (surface) details.surface = surface;
      if (model) details.model = model;
      if (grade) details.grade = grade;
      if (type) details.type = type;
      if (packing) details.packing = packing;
      if (weight) details.weight = weight;
      if (application) details.application = application;
      if (link) details.link = link;
      if (color) details.color = color

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("image", image);
      formData.append("details", JSON.stringify(details));

      if (product) {
        await editProduct(product._id, formData);
      } else {
        await addProduct(formData);
      }
      message.success(`${product ? 'Product updated' : 'Product added'} successfully!`);
      fetchProducts()
      form.resetFields();
      setImage(null);
      onClose();
    } catch (error) {
      message.error('Failed to process product.');
      console.error('Error processing product:', error);
    }
  };


  const handleCancel = () => {
    form.resetFields();
    setImage(null);
    onClose();
  };

  const uploadProps = {
    name: "file",
    listType: "picture",
    showUploadList: false,
    beforeUpload: (file) => {
      setImage(file);
      return false;
    },
  };

  return (
    <Modal
      title={product ? "Edit Product" : "Add Product"}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-4"
        >
          <Form.Item
            label="Name"
            name="productName"
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input type="text" placeholder="Enter name here" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder="Select a category"
              options={categories.map(category => ({
                value: category.category,
                label: category.label
              }))}
              onChange={handleCategoryChange}
            />
          </Form.Item>

          <Form.Item
            label="Subcategory"
            name="subcategory"
            rules={[{ required: true, message: 'Please select a subcategory' }]}
          >
            <Select placeholder="Select a subcategory">
              {filteredSubcategories.map(sub => (
                <Select.Option key={sub.subcategory} value={sub.value}>
                  {sub.subcategory}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {image && (typeof image === 'string' ? (
    <img src={image} alt="Product" style={{ width: 100, marginTop: 10 }} />
  ) : (
    image instanceof File && (
      <img src={URL.createObjectURL(image)} alt="Product" style={{ width: 100, marginTop: 10 }} />
    )
  ))}
          </Form.Item>

          <Form.Item label="Model" name="model">
            <Input type="text" placeholder="Enter Model" />
          </Form.Item>

          <Form.Item label="Size" name="size">
            <Input type="text" placeholder="Enter Size" />
          </Form.Item>

          <Form.Item label="Thickness (MM)" name="thickness">
            <Input type="text" placeholder="Enter Thickness (MM)" />
          </Form.Item>

          <Form.Item label="Surface" name="surface">
            <Input type="text" placeholder="Enter Surface" />
          </Form.Item>

          <Form.Item label="Grade" name="grade">
            <Input type="text" placeholder="Enter Grade" />
          </Form.Item>

          <Form.Item label="Packing" name="packing">
            <Input type="text" placeholder="Enter Packing" />
          </Form.Item>

          <Form.Item label="Weight" name="weight">
            <Input type="text" placeholder="Enter Weight" />
          </Form.Item>

          <Form.Item label="Application" name="application">
            <Input type="text" placeholder="Enter Application" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Input type="text" placeholder="Enter Type" />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Input type="text" placeholder="Enter Color" />
          </Form.Item>

          <Form.Item label="link" name="link">
            <Input type="link" placeholder="Enter Catalogue link" />
          </Form.Item>
        </Form>
      )}
      <Button type="primary" onClick={handleOk}>Submit</Button>
    </Modal>
  );
};

export default AddProductsModal;
