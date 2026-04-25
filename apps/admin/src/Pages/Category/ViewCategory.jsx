// Category.js
import React, { useState } from "react";
import { Avatar, Button, Table, Modal, Input, Upload } from "antd";
import {
  EyeOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  UploadOutlined,
  EditOutlined
} from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const dataSource = [
  { key: "1", number: 1, img: img1, name: "Sample Data 1", date: "30/08/2024" },
  { key: "2", number: 2, img: img2, name: "Sample Data 2", date: "03/08/2024" },
  { key: "3", number: 3, img: img3, name: "Sample Data 3", date: "01/08/2024" }
];

const columns = (showModal) => [
  {
    title: (
      <span className="flex items-center">
        Number <CaretUpOutlined className="ml-1" />
      </span>
    ),
    dataIndex: "number",
    key: "number",
    filterIcon: (filtered) => (
      <CaretUpOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    )
  },
  {
    title: <span className="flex items-center">Image</span>,
    dataIndex: "img",
    key: "img",
    render: (img) => (
      <Avatar src={img} size={44} /> // Adjust the size as needed
    )
  },
  {
    title: (
      <span className="flex items-center">
        Name <CaretUpOutlined className="ml-1" />
      </span>
    ),
    dataIndex: "name",
    key: "name",
    filterIcon: (filtered) => (
      <CaretUpOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    )
  },
  {
    title: (
      <span className="flex items-center">
        Date <CaretUpOutlined className="ml-1" />
      </span>
    ),
    dataIndex: "date",
    key: "date",
    filterIcon: (filtered) => (
      <CaretUpOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    )
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2">
        <a
          onClick={() => showModal(record)}
          className="text-blue-500 hover:underline"
        >
          <EditOutlined />
        </a>
        <a className="text-red-500 hover:text-red-300">
          <DeleteOutlined />
        </a>
      </div>
    )
  }
];

const ViewCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (record) => {
    setModalContent(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-md">
        <div className="flex gap-3 items-center font-bold mb-3">
          Type List [Slab Tiles]
          <span className="bg-red-700 text-white p-1 h-7 text-center w-7 rounded-sm">
            {dataSource.length}
          </span>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns(showModal)}
          pagination={false}
          className="border border-gray-200"
        />
      </div>
      <Modal
        title="Edit Type [Slab Tiles]"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-36">Name:</span>
            <Input type="text" placeholder="Enter name here" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-36">Category:</span>
            <Input type="text" disabled placeholder="Category is fixed" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-28 ">Upload Image:</span>
            <Upload
              beforeUpload={() => false} // Prevent automatic upload for demo purposes
              showUploadList={false} // Hide the upload list
              customRequest={({ file, onSuccess }) => {
                // Simulate a successful upload
                setTimeout(() => {
                  onSuccess("ok");
                }, 1000);
              }}
            >
              <Button icon={<UploadOutlined />} type="primary" >
                Upload Image
              </Button>
            </Upload>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewCategory;
