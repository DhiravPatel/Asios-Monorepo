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
    <div className="admin-page">
      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Engagement · General</span>
            <h2 className="admin-page__title">Inquiry List</h2>
          </div>
        </div>

        <div className="admin-page__card-body">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spin tip="Loading..." />
            </div>
          ) : (
            <Table
              dataSource={paginatedData}
              columns={columns}
              pagination={false}
              rowKey="_id"
            />
          )}
        </div>

        {!loading && (
          <div className="admin-page__pagination-wrap">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={inquiries.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiry;
