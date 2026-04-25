import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, MessageOutlined, ProductOutlined, QuestionOutlined, BookOutlined, CodeSandboxOutlined, FormOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import 'antd/dist/reset.css'; 

const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleClick = (path) => {
    navigate(path); 
  };

  return (
    <div className="w-64 h-full bg-[#001529] text-white"> 
      <Menu
        mode="inline"
        theme="dark"
        className="mt-2"
      >
        <Menu.Item  icon={<HomeOutlined />} onClick={() => handleClick('/dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item  icon={<UserOutlined />} onClick={() => handleClick('/category')}>
          Category
        </Menu.Item>
        <Menu.Item  icon={<CodeSandboxOutlined />} onClick={() => handleClick('/type')}>
          Type
        </Menu.Item>
        <Menu.Item icon={<ProductOutlined />} onClick={() => handleClick('/products')}>
          Product
        </Menu.Item>
        <Menu.Item  icon={<BookOutlined />} onClick={() => handleClick('/catalogue')}>
          Catalogue
        </Menu.Item>
        <Menu.Item  icon={<FormOutlined />} onClick={() => handleClick('/blog')}>
          Blog
        </Menu.Item>
        <Menu.Item  icon={<MailOutlined />} onClick={() => handleClick('/bulk-email')}>
          Bulk Email
        </Menu.Item>
        <Menu.Item  icon={<MessageOutlined />} onClick={() => handleClick('/product-inquiry')}>
          Product Inquiry
        </Menu.Item>
        <Menu.Item  icon={<QuestionOutlined />} onClick={() => handleClick('/inquiry')}>
          Inquiry
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
