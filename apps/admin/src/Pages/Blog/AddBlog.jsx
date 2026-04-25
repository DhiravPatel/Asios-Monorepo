import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Card, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  useGetBlogById,
  useAddBlog,
  useUpdateBlog,
  useGenerateBlog,
} from '../../hooks/Blog/BlogHook';

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');

  const location = useLocation();
  const blogDataFromState = location.state?.blogData;

  const shouldFetchBlog = !!id && !blogDataFromState;
  const { data: fetchedBlog } = useGetBlogById(shouldFetchBlog ? id : null);

  const { mutate: addBlog, loading: adding } = useAddBlog();
  const { mutate: updateBlog, loading: updating } = useUpdateBlog();
  const { mutate: generateBlog, loading: aiLoading } = useGenerateBlog();

  const loading = adding || updating;

  useEffect(() => {
    if (id && blogDataFromState) {
      form.setFieldsValue({
        title: blogDataFromState.title,
        content: blogDataFromState.content,
      });

      setImageFile({
        uid: '-1',
        name: 'Uploaded Image',
        status: 'done',
        url: blogDataFromState.imageUrl,
      });
    }
  }, [id, blogDataFromState, form]);

  useEffect(() => {
    if (fetchedBlog) {
      form.setFieldsValue({
        title: fetchedBlog.title,
        content: fetchedBlog.content,
      });

      setImageFile({
        uid: '-1',
        name: 'Uploaded Image',
        status: 'done',
        url: fetchedBlog.imageUrl,
      });
    }
  }, [fetchedBlog, form]);

  const handleCancel = () => {
    navigate('/blog');
  };

  const handleSave = async (values) => {
    if (!imageFile) {
      message.error('Please upload an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);

      if (imageFile.originFileObj) {
        formData.append('imageFile', imageFile.originFileObj);
      } else {
        formData.append('existingImageUrl', imageFile.url);
      }

      const result = id
        ? await updateBlog(id, formData)
        : await addBlog(formData);

      if (result?.data) {
        message.success(`Blog ${id ? 'updated' : 'added'} successfully!`);
        navigate('/blog');
      } else {
        message.error(result?.message || 'Failed to submit blog');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(`Failed to ${id ? 'update' : 'add'} blog. Please try again.`);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }
      setImageFile({ ...file, originFileObj: file });
      return false;
    },
    fileList: imageFile ? [imageFile] : [],
    onRemove: () => setImageFile(null),
  };

  const handleAIGenerate = async () => {
    try {
      const result = await generateBlog({ question: aiQuestion });
      if (result?.data) {
        const { title, content } = result.data;
        form.setFieldsValue({
          title: title || '',
          content: content || '',
        });
        message.success('Blog content generated!');
      } else {
        message.info('No content generated.');
      }
      setAiModalOpen(false);
      setAiQuestion('');
    } catch (error) {
      message.error('Failed to generate blog content.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex items-center mb-6 justify-between">
      <h2 className="text-2xl font-semibold">{id ? 'Edit Blog' : 'Add New Blog'}</h2>
      <div>
        <Button onClick={() => setAiModalOpen(true)} style={{ marginRight: '12px' }}>
          Generate From AI
        </Button>
      </div>
      </div>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSave} autoComplete="off">
          <Form.Item
            label="Blog Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter blog title!' },
              { min: 3, message: 'Title must be at least 3 characters!' },
            ]}
          >
            <Input placeholder="Enter blog title" size="large" />
          </Form.Item>

          <Form.Item
            label="Blog Image"
            name="image"
          >
            <Upload {...uploadProps} listType="picture-card" maxCount={1} accept="image/*">
              {!imageFile && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Blog Content"
            name="content"
            rules={[{ required: true, message: 'Please enter blog content!' }]}
            >
            <ReactQuill
                value={form.getFieldValue('content') || ''}
                onChange={(value) => form.setFieldsValue({ content: value })}
                theme="snow"
                style={{ minHeight: '200px' }}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex gap-3 justify-end">
              <Button size="large" onClick={handleCancel}>
                Cancel
              </Button>
              <Button htmlType="submit" size="large" loading={loading}>
                {id ? 'Update Blog' : 'Save Blog'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="Ask AI"
        open={aiModalOpen}
        onCancel={() => {
          setAiModalOpen(false);
          setAiQuestion('');
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setAiModalOpen(false);
            setAiQuestion('');
          }}>
            Cancel
          </Button>,
          <Button
            key="generate"
            type="primary"
            loading={aiLoading}
            disabled={!aiQuestion.trim()}
            onClick={handleAIGenerate}
          >
            Generate
          </Button>,
        ]}
      >
        <Input
          placeholder="Ask your question..."
          value={aiQuestion}
          onChange={e => setAiQuestion(e.target.value)}
          onPressEnter={e => e.preventDefault()}
        />
      </Modal>
    </div>
  );
};

export default AddBlog;
