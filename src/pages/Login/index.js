import './index.scss';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { loginAction } from '@actions';
import { storage, getStorage } from '@helpers';

const LoginPage =  () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.auth.isFetching);

  useEffect(() => {
    let isCurrent = true;
    const storage = () => {
      const loginStore = getStorage.login();

      loginStore
        ? form.setFieldsValue({
            email: loginStore.email,
            password: loginStore.password,
            remember: loginStore.remember
          })
        : null;
    };
    if (isCurrent) {
      storage();
    }

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleSubmit = async values => {
    const { email, password, remember } = values;

    remember ? storage.set('login', values) : storage.remove('login', values);

    await dispatch(loginAction(email, password));
  };
  return (
    <div className={'page'}>
      <div className={'page-login'}>
        <div className={'page-content'}>
          <div className={'brand'}>
            <h2 className={'brand-text'}>Welcome!</h2>
          </div>
          <p>Sign in to your account</p>
          <Form
            style={{ textAlign: 'left' }}
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username or email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
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
                {isFetching ? <Spin>VERIFYING...</Spin> : 'LOGIN'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
