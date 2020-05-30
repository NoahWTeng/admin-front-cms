import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { loginAdmin } from '@actions';
import { storage, getStorage } from '@helpers';
import '../index.scss';

const store = getStorage.login();

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email, password, remember } = values;
    remember ? storage.set('login', values) : storage.remove('login'),
      form.setFieldsValue({ email: '', password: '', remember: false });

    dispatch(loginAdmin({ email, password }));
  };

  return (
    <Form
      style={{ textAlign: 'left' }}
      onFinish={handleSubmit}
      form={form}
      initialValues={{
        email: (store && store.email) || null,
        password: (store && store.password) || null,
        remember: (store && store.remember) || null,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email or username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username or email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button className="btn-login" type="primary" htmlType="submit">
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
