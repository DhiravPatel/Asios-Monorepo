import React, { useState } from 'react';
import { Table, Pagination, message, Spin, Image, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetAllBlogs, useDeleteBlog } from '../../hooks/Blog/BlogHook';

const Blog = () => {
  const navigate = useNavigate();

  const { data: blogs, loading, refetch: fetchBlogs } = useGetAllBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleAddBlog = () => {
    navigate('/add-blog');
  };

  const handleEditBlog = (id) => {
    const blogToEdit = blogs.find(blog => blog.$id === id);
    navigate(`/edit-blog/${id}`, { state: { blogData: blogToEdit } });
  };


  const handleDeleteBlog = (blogId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this blog?',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteBlog(blogId);
          message.success('Blog deleted successfully!');
          fetchBlogs();
        } catch (error) {
          message.error('Failed to delete blog.');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      ellipsis: true,
      render: (text) => (
        <div style={{ maxWidth: 300 }}>
          {text && text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </div>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 120,
      render: (imageUrl) => (
        imageUrl ? (
          <Image
            width={80}
            height={60}
            src={imageUrl}
            alt="Blog"
            style={{ objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          <div style={{
            width: 80,
            height: 60,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            color: '#999'
          }}>
            No Image
          </div>
        )
      ),
    },
    {
      title: 'Created At',
      dataIndex: '$createdAt',
      key: '$createdAt',
      width: 120,
      render: (date) => (
        <span>{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div className="flex gap-2">
          <a className="iconbutton" onClick={() => handleEditBlog(record.$id)}>
            <EditOutlined />
          </a>
          <a className='iconbutton' onClick={() => handleDeleteBlog(record.$id)}>
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];

  const paginatedData = blogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="admin-page">
      <div className="admin-page__action-bar">
        <Button className="admin-add-btn" onClick={handleAddBlog}>
          Add New Blog
        </Button>
      </div>

      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Catalogue · Blog</span>
            <h2 className="admin-page__title">Blog List</h2>
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
              rowKey="$id"
              scroll={{ x: 800 }}
            />
          )}
        </div>

        {!loading && (
          <div className="admin-page__pagination-wrap">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={blogs.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
