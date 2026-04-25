import React from "react";
import { Card, Image } from "antd";
import productimg from '../../assets/product.jpg'
import categoryimg from '../../assets/category.jpg'
import subcategory from '../../assets/subcategory.jpg'
import inquiryimg from '../../assets/inquiry.jpg'
import { useGetAllCategories } from "../../hooks/Category/CategoryHook";
import { useGetAllSubCategories } from "../../hooks/SubCategory/SubCategoryHook";
import { useGetAllProducts } from "../../hooks/Product/ProductHook";
import { useGetAllInquiries } from "../../hooks/Inquiry/InquiryHook";

const Dashboard = () => {
  const { data: category } = useGetAllCategories();
  const { data: subCategory } = useGetAllSubCategories();
  const { data: product } = useGetAllProducts();
  const { data: inquiry } = useGetAllInquiries();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        title="Products"
        bordered={false}
        hoverable
        className="shadow-lg custom-card-header"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
          <p className="font-bold text-xl">{product.length}</p>
          <p className="text-lg ml-3">Products</p>
          </div>
        <Image src={productimg} width={85} preview={false}/>
        </div>
      </Card>
      <Card
        title="Category"
        bordered={false}
        hoverable
        className="shadow-lg custom-card-header"
      >
         <div className="flex justify-between">
          <div className="flex items-center">
          <p className="font-bold text-xl">{category.length}</p>
          <p className="text-lg ml-3">Category</p>
          </div>
          <Image src={categoryimg} width={100} preview={false}/>
        </div>
      </Card>
      <Card
        title="Types"
        bordered={false}
        hoverable
        className="shadow-lg custom-card-header"
      >
         <div className="flex justify-between">
          <div className="flex items-center">
          <p className="font-bold text-xl">{subCategory.length}</p>
          <p className="text-lg ml-3">Sub Category</p>
          </div>
          <Image src={subcategory} width={90} preview={false}/>
        </div>
      </Card>
      <Card
        title="Contect"
        bordered={false}
        hoverable
        className="shadow-lg custom-card-header"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
          <p className="font-bold text-xl">{inquiry.length}</p>
          <p className="text-lg ml-3">Inquiry</p>
          </div>
          <Image src={inquiryimg} width={75} preview={false}/>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
