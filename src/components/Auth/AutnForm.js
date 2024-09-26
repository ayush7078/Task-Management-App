import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const { login, register } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(values.email, values.password);
        message.success('Login successful');
        navigate('/tasks');
      } else {
        await register(values);
        message.success('Registration successful');
        setIsLogin(true); // Switch back to login form after successful registration
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <Form onFinish={handleFinish} layout="vertical">
        {!isLogin && (
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => setIsLogin(!isLogin)} block>
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
