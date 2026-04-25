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
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Blogs</h2>
        <Button style={{ marginLeft: '15px' }} onClick={handleAddBlog}>
          Add New Blog
        </Button>
      </div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table
              dataSource={paginatedData}
              columns={columns}
              pagination={false}
              rowKey="$id"
              scroll={{ x: 800 }}
            />
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={blogs.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: '16px', textAlign: 'right' }}
          />
        </>
      )}
    </div>
  );
};

export default Blog;
