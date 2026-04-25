import React, { useState } from 'react';
import { Table, Pagination, Spin } from 'antd';
import { useGetAllInquiries } from '../../hooks/Inquiry/InquiryHook';

const Inquiry = () => {
  const { data: inquiries, loading } = useGetAllInquiries();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];


  const paginatedData = inquiries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Inquiries</h2>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            rowKey="_id"
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={inquiries.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: '16px', textAlign: 'right' }}
          />
        </>
      )}
    </div>
  );
};

export default Inquiry;
