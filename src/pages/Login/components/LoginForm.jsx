import '../index.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { loginAction } from '@actions';
import { storage, getStorage } from '@helpers';

const loginStore = getStorage.login();

const LoginForm = () => {
  const isFetching = useSelector(state => state.auth.isFetching);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCurrent = true;

    const setForm = () => {
      if (loginStore)
        form.setFieldsValue({
          email: loginStore.email,
          password: loginStore.password,
          remember: loginStore.remember
        });
    };

    if (isCurrent) setForm();

    return () => (isCurrent = false);
  }, []);

  const handleSubmit = async values => {
    const { email, password, remember } = values;

    remember ? storage.set('login', values) : storage.remove('login'),
      form.setFieldsValue({ email: '', password: '', remember: false });

    await dispatch(loginAction({ email, password }));
  };

  return (
    <Form style={{ textAlign: 'left' }} onFinish={handleSubmit} form={form}>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email or username!'
          }
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
        <Button
          className="btn-login"
          type="primary"
          htmlType="submit"
          disabled={isFetching}
        >
          {isFetching ? <Spin>Verifying...</Spin> : 'LOGIN'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
