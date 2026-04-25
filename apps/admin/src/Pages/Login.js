import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-bg.png'
import { useLogin } from '../hooks/User/UserHook';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values) => {
    try {
      await login(values);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"  >
      <div style={{marginRight:'100px'}}>
        <img style={{width:'650px', height:'350px'}} src={logo}></img>
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin} // Update the onFinish prop to use handleLogin
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input placeholder="Email" className="mb-1" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined onClick={togglePasswordVisibility} />
                ) : (
                  <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                )
              }
              className="mb-1"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" style={{backgroundColor:'#A01313'}}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};

export default Login;
