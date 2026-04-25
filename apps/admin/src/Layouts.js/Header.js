import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

const AppHeader = () => {

const navigate = useNavigate()

const handleLogout = ()=>{
  localStorage.removeItem('token')
  navigate('/')
}

  return (
    <Header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-semibold">Asios Web-Panel</div>
      <Menu mode="horizontal" theme="dark" className="flex items-center">
       
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
