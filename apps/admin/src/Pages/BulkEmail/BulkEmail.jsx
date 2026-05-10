import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSendBulkEmail } from '../../hooks/BulkEmail/BulkEmailHook';

const BulkEmail = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [recipientsText, setRecipientsText] = useState('');
  const { mutate: sendBulkEmail, loading } = useSendBulkEmail();

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleSend = async (values) => {
    const emails = (values.recipientsText || '')
      .split(',')
      .map(e => e.trim())
      .filter(e => e);
    if (emails.length === 0) {
      message.error('Please enter at least one recipient email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter(email => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      message.error(`Invalid email(s): ${invalidEmails.join(', ')}`);
      return;
    }
    try {
      const result = await sendBulkEmail({
        subject: values.subject,
        emails,
        message: values.message,
      });
      if (result?.success) {
        message.success('Bulk email sent successfully!');
        navigate('/dashboard')
      } else {
        message.error(result?.message || 'Failed to send bulk email');
      }
    } catch (error) {
      message.error('Failed to send bulk email. Please try again.');
    }
  };



  return (
    <div className="admin-page">
      <div className="admin-page__card">
        <div className="admin-page__card-head">
          <div>
            <span className="admin-page__title-eyebrow">Engagement · Outreach</span>
            <h2 className="admin-page__title">Send Bulk Email</h2>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          <Form form={form} layout="vertical" onFinish={handleSend} autoComplete="off">
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                { required: true, message: 'Please enter email subject!' },
                { min: 3, message: 'Subject must be at least 3 characters!' },
              ]}
            >
              <Input placeholder="Enter email subject" />
            </Form.Item>

            <Form.Item
              label="Recipients"
              name="recipientsText"
              rules={[{ required: true, message: 'Please enter recipient email addresses!' }]}
            >
              <Input.TextArea
                placeholder="Enter email addresses, separated by commas"
                value={recipientsText}
                onChange={(e) => setRecipientsText(e.target.value)}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter email message!' }]}
            >
              <ReactQuill
                value={form.getFieldValue('message') || ''}
                onChange={(value) => form.setFieldsValue({ message: value })}
                theme="snow"
                style={{ minHeight: '200px' }}
              />
            </Form.Item>

            <Form.Item className="mb-0" style={{ marginTop: 8 }}>
              <div className="flex gap-3 justify-end">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  className="admin-add-btn"
                  htmlType="submit"
                  loading={loading}
                >
                  Send Email
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BulkEmail;
